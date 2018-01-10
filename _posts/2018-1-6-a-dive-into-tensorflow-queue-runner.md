---
layout: post
title: A dive into tensorflow queue runner
author: ducta
---

Trong một ứng dụng về học máy thì khâu chuẩn bị dữ liệu ban đầu là phần quan trọng nhất chiếm rất nhiều thời gian - từ bước thu nhập, chứa ở đâu, tiền xử lý... thậm chí là cách thức đọc nó vào trong một bước của quá trình huấn luyện một mô hình. Bài viết này nhằm mục đích đi sâu vào cách thức hoạt động của queue runner và tổng quát nó trong tensorflow (một framework phổ biến về deep learning) nhằm mục đích giải quyết vấn đề thực tế dữ liệu thu nhập được có thể chứa nhiều nơi nhưng vẫn có một giao tiếp chung trong quá trình đọc vào quá trình huấn luyện. Ví dụ dữ liệu của bạn chứa ở cả local, database, hoặc Amazon S3 service... bằng cách nào bạn có thể có một hàm đọc chung cho các nơi chứa dữ liệu này trong tensorflow. Ý tưởng ban đầu là vấn đề giải quyết bằng cơ chế feed_dict, bạn viết các reader khác nhau cho mỗi data source khác nhau đọc dữ liệu từ mỗi cái và đưa vào feed_dict. Tuy nhiên, cơ chế feed_dict là flexibility nhưng không tối ưu trong việc scale theo [Tensorflow performance guide](https://www.tensorflow.org/performance/performance_guide#input_pipeline_optimization) (chú ý trong tensorflow version >= 1.2, [Dataset API](https://www.tensorflow.org/programmers_guide/datasets) được recommend sử dụng để viết một input pipeline thay cho queue runner). 

>While feeding data using a feed_dict offers a high level of flexibility, in most instances using feed_dict does not scale optimally...

Để giải quyết vấn đề này (trong lúc tensorflow version < 1.2) chúng tôi kết hợp cả hai cơ chế queue runner và feed_dict bằng cách thay đổi codebase của queue runner trong tensorflow thành general queue runner. Queue trong tensorflow thường có 2 operator, thứ nhất là enqueue operator sử dụng để đưa dữ liệu vào trong trong FIFO queue, thứ hai là dequeue operator sử dụng để lấy dữ liệu đã được enqueue:

![alt text](https://www.tensorflow.org/images/IncremeterFifoQueue.gif "tf.FIFOQueue")

(Nguồn: https://www.tensorflow.org/api_guides/python/threading_and_queues)

Trong running-time các enqueue operator sẽ được thi hành bởi các threads được tạo ra bởi `tf.train.QueueRunner`. Vài dòng code cuối trong hàm `tf.train.start_queue_runners` sẽ cho chúng ta thấy rõ điều này:

<div style="font-size: 75%;">
{% highlight python %}
    ...
    with sess.graph.as_default():
        threads = []
        for qr in ops.get_collection(collection):
            threads.extend(qr.create_threads(sess, coord=coord, daemon=daemon,
                                       start=start))
    return threads
{% endhighlight %}
</div>
Ở đây tham số `collection` được mặc định là `tf.GraphKeys.QUEUE_RUNNERS`, nghĩa là các queue runner mặc định sẽ được lấy từ `collection` có tên là `tf.GraphKeys.QUEUE_RUNNERS`. Bạn có thể xem chi tiết hàm `tf.train.add_queue_runner` để thấy rõ điều này, nó đơn giản chỉ thêm queue runner vào trong một collection:
<div style="font-size: 75%;">
 {% highlight python %}
    def add_queue_runner(qr, collection=ops.GraphKeys.QUEUE_RUNNERS):
      """Adds a `QueueRunner` to a collection in the graph.
    
      When building a complex model that uses many queues it is often difficult to
      gather all the queue runners that need to be run.  This convenience function
      allows you to add a queue runner to a well known collection in the graph.
    
      The companion method `start_queue_runners()` can be used to start threads for
      all the collected queue runners.
    
      Args:
        qr: A `QueueRunner`.
        collection: A `GraphKey` specifying the graph collection to add
          the queue runner to.  Defaults to `GraphKeys.QUEUE_RUNNERS`.
      """
      ops.add_to_collection(collection, qr)
{% endhighlight %}
 </div>
 Trong implemention của `tf.train.QueueRunner` chúng ta chỉ cần quan tâm tới hai hàm `_run` và `create_threads`. Về cơ bản `tf.train.QueueRunner` tạo các threads của nó bằng cách chạy hàm `create_threads` với hàm private `_run` như là thread function để chạy enqueue operator. Bạn chú ý rằng một `tf.train.QueueRunner` có thể chứa nhiều enqueue operator để chạy, và một enqueue operator được chạy bởi một thread. Các enqueue thread được đồng bộ bởi đối tượng `tf.train.coordinator` và mặc định là các daemon threads. Một điều khá may mắn là các enqueue operator hỗ trợ feed_dict mechanism, nghĩa là chúng ta có thể thực thi câu lệnh `session.run(enqueue, feed_dict={feed_tensors: data_to_feed})` điều này không được nói tới rõ ràng trong tensorflow document. Vì thế, chúng tôi thay đổi một chút hàm `_run` để nó có thể làm việc với feed_dict mechanism bằng cách thêm hai tham số cho hàm này là `feed_dict_fn` và `feed_tensor`. Mục đích của hàm `feed_dict_fn` là để lấy dữ liệu từ source và feed vào `feed_tensor`:

<div style="font-size: 75%;">
{% highlight python %}
    def _run(self, sess, enqueue_op, coord=None, feed_dict_fn=None, feed_tensor=None):
        """Execute the enqueue op in a loop, close the queue in case of error.

        :param sess: A Session
        :param enqueue_op: The Operation to run
        :param coord: Optional Coordinator object for reporting errors and checking
        :param feed_dict_fn: A function to get data that corresponds to a enqueue_op
        :param feed_tensor: A tensor to feed data which return from feed_dict_fn
        :return:
        """

        decremented = False
        try:
            while True:
                if coord and coord.should_stop():
                    break
                try:
                    if not feed_dict_fn is None and not feed_tensor is None: # Modified here
                        sess.run(enqueue_op, feed_dict={feed_tensor: feed_dict_fn()}) # Modified here
                    else: # Modified here
                        sess.run(enqueue_op) 
                except self._queue_closed_exception_types:  # pylint: disable=catching-non-exception
                    # This exception indicates that a queue was closed
                    with self._lock:
                        self._runs_per_session[sess] -= 1
                        decremented = True
                        if self._runs_per_session[sess] == 0:
                            try:
                                sess.run(self._close_op)
                            except Exception as e:
                                # Intentionally ignore errors from close_op.
                                logging.vlog(1, "Ignored exception: %s", str(e))
                        return
        except Exception as e:
            # This catches all other exceptions.
            if coord:
                coord.request_stop(e)
            else:
                logging.error("Exception in GeneralQueueRunner: %s", str(e))
                with self._lock:
                    self._exceptions_raised.append(e)
                raise
        finally:
            # Make sure we account for all terminations: normal or errors.
            if not decremented:
                with self._lock:
                    self._runs_per_session[sess] -= 1

{% endhighlight %}
</div>

Như vậy chúng ta chỉ cần thay đổi nhỏ trong hàm `create_threads` để cho hàm `_run` làm việc là thêm vào tham số của thread function là `feed_dict_fn` và `feed_tensor`:

<div style="font-size: 75%;">
{% highlight python %}
    def create_threads(self, sess, coord=None, daemon=False, start=False):
        """Create threads to run the enqueue ops for the given session.

        This method requires a session in which the graph was launched.  It creates
        a list of threads, optionally starting them.  There is one thread for each
        op passed in `enqueue_ops`.
        The `coord` argument is an optional coordinator that the threads will use
        to terminate together and report exceptions.  If a coordinator is given,
        this method starts an additional thread to close the queue when the
        coordinator requests a stop.
        If previously created threads for the given session are still running, no
        new threads will be created.

        :param sess: A `Session`
        :param coord: Optional `Coordinator` object for reporting errors and checking
            stop conditions.
        :param daemon: Boolean. If `True` make the threads daemon threads.
        :param start: Boolean If `True` starts the threads. If `False` the
            caller must call the `start()` method of the returned threads
        :return:
            A list of threads
        """
        with self._lock:
            try:
                if self._runs_per_session[sess] > 0:
                    # Already started: no new threads to return
                    return []
            except KeyError:
                # We haven't seen this session yet
                pass
            self._runs_per_session[sess] = len(self._enqueue_ops)
            self._exceptions_raised = []

        if self._feed_dict_funcs is None or self._feed_tensors is None:
            ret_threads = [threading.Thread(target=self._run, args=(sess, op, coord))
                           for op in self._enqueue_ops]
        else:
            ret_threads = [threading.Thread(target=self._run, # Modified here
                                            args=(sess, op, coord, feed_dict_fn, feed_tensor)) # Modified here
                           for op, feed_dict_fn, feed_tensor in # Modified here
                           zip(self._enqueue_ops, self._feed_dict_funcs, self._feed_tensors)] # Modified here
        if coord:
            ret_threads.append(threading.Thread(target=self._close_on_stop,
                                                args=(sess, self._cancel_op, coord)))

        for t in ret_threads:
            if coord:
                coord.register_thread(t)
            if daemon:
                t.daemon = True
            if start:
                t.start()

        return ret_threads
{% endhighlight %}
</div>

Bạn có thể xem toàn bộ code của general queue runner tại [đây](https://github.com/ChappiebotAI/engineering/blob/master/general_queue_runner/general_queue_runner.py). Để sử dụng general queue runner, bạn cần khởi tạo nó như với queue runner bình thường với các tham số `feed_dict_funcs`, `feed_tensors`. Các giá trị trong 2 tham số `feed_dict_funcs` và `feed_tensors` phải tương ứng với nhau, ví dụ hàm đọc dữ liệu từ database phải tương ứng với tensor được đọc ra từ đó. Dưới đây là một demo sample sử dụng general queue runner với cả 2 kiểu dữ liệu là fixed shape và dynamic shape:
<div style="font-size: 75%;">
{% highlight python %}
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import numpy as np
import tensorflow as tf
from general_queue_runner import GeneralQueueRunner

a = np.array([0., 1., 2., 3., 4., 5., 6., 7., 8., 9., 10.], dtype=np.int32)
test_samples = np.tile(a, [5,1])
test_samples = np.transpose(test_samples)
idx = 0
batch_size = 4

b = [[0, 1, 2, 3],
     [0, 1, 2, 3, 4],
     [0, 1, 2, 3, 4, 5],
     [0, 1, 2, 3, 4, 6],
     ]

def read_func():
    global idx, test_samples
    #print("\nAdded to the queue\n")
    if idx >= test_samples.shape[0]:
        idx = 0

    sample = test_samples[idx]
    idx += 1

    return np.reshape(sample,-1).tobytes()


def read_func_0():
    global idx, b
    #print("\nAdded to the queue\n")
    if idx >= len(b):
        idx = 0

    sample = b[idx]
    idx += 1

    return np.reshape(sample,-1).tobytes()

serialized_tf_example = tf.placeholder(tf.string, name='tf_example')
feature_infos={
    'x': tf.FixedLenFeature([], tf.string)
}

# decoder
tf_example = tf.parse_single_example(serialized_tf_example, feature_infos)
# print tf_example['x'].dtype

queue = tf.FIFOQueue(capacity=20, dtypes=[tf.string], name='fifo_queue')
size = queue.size()
enqueue_op = queue.enqueue(tf_example['x'], name="enqueue")
value = queue.dequeue()

def test_fixed_shape(value):
    qr = GeneralQueueRunner(
        queue=queue,
        enqueue_ops=[enqueue_op, enqueue_op],
        feed_dict_funcs=[read_func, read_func],
        feed_tensors=[tf_example['x'], tf_example['x']]
    )
    tf.train.add_queue_runner(qr)

    decode_x = tf.decode_raw(value, tf.int32)
    decode_x = tf.reshape(decode_x, [5])
    data_batch = tf.train.shuffle_batch([decode_x], batch_size=batch_size, capacity=24, num_threads=1, min_after_dequeue=6)

    sess =  tf.Session()
    coord = tf.train.Coordinator()
    threads = tf.train.start_queue_runners(sess, coord=coord)
    for _ in range(0, 20):
        run_options = tf.RunOptions(timeout_in_ms=4000)
        curr_data_batch = sess.run([data_batch], options=run_options)
        print(curr_data_batch)
        print("\n")

    coord.request_stop()
    coord.join(threads)
    sess.close()

def test_dynamic_shape(value):
    qr = GeneralQueueRunner(
        queue=queue,
        enqueue_ops=[enqueue_op],
        feed_dict_funcs=[read_func_0],
        feed_tensors=[tf_example['x']]
    )

    tf.train.add_queue_runner(qr)
    value = tf.reshape(value,[])

    data_batch = tf.train.batch([value], batch_size=batch_size, capacity=24, num_threads=1)

    sess =  tf.Session()
    coord = tf.train.Coordinator()
    threads = tf.train.start_queue_runners(sess, coord=coord)
    for _ in range(0, 2):
        run_options = tf.RunOptions(timeout_in_ms=4000)
        curr_data_batch = sess.run(data_batch, options=run_options)

        for v in curr_data_batch:
            r = np.fromstring(v, dtype=np.int64)
            print(r)
        print("\n")

    coord.request_stop()
    coord.join(threads)
    sess.close()

FIXED_TEST = True
if FIXED_TEST: test_fixed_shape(value)
else: test_dynamic_shape(value)
{% endhighlight %}
</div>

Một lưu ý nhỏ đối với general queue runner là nó không thể được serialized tới computation graph thông thường được chứa theo định dạng protobuf. Vì thế nó không được đăng ký bởi hàm `register_proto_function` và hàm `to_proto` của nó là không được thực hiện bạn có thể xem nó trong code của general queue runner.
