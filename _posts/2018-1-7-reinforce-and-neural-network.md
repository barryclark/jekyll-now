---
layout: post
title: Ứng dụng thuật toán REINFORCE trong Neural Network
author: ducta
---

Trước khi bắt đầu với thuật toán REINFORCE chúng ta điểm lại một chút về _Markov Decision Process_ (MDP) - là một framework chung cho hầu hết các bài toán về Reinforcement Learning (RL). MDP bao gồm các thành phần:

&nbsp;$$\mathcal{S}$$ : Một tập hợp hữu hạn các trạng thái hệ thống <br/><br/>
&nbsp;$$\mathcal{A}$$ : Một tập hợp hữu hạn các hành động của agent <br/><br/>
&nbsp;$$p(s'|s,a)$$ : Các xác suất chuyển đổi trạng thái khi có một hành động, ở đây $$s', s \in \mathcal{S}$$ và $$ a \in \mathcal{A}$$ <br/><br/>
&nbsp;$$\mathcal{R} :\mathcal{S} \times \mathcal{A} \rightarrow \mathbb{R}$$: Hàm phần thưởng<br/><br/>
&nbsp;$$\pi(a|s)$$ : Agent's policy, nói một cách tiếng việt là xác suất thực hiện hành động khi gặp một trạng thái.<br/><br/>
&nbsp;$$\gamma$$ : Discount factor <br/><br/>

(Chú ý trong bài viết này chúng ta chỉ quan tâm đến episodic MDP, vì thuật toán REINFORCE chỉ áp dụng trên một episodic MDP trong trường hợp là continuing MDP các bạn có thể xem ở chương 13 của <i>R.Sutton 2nd</i>. Mỗi khi nhắc đến MDP trong bài viết này sẽ được hiểu như là episodic MDP) <br/> <br/>
Các ký hiệu thông dụng trong MDP:

- Reward của một episode bắt đầu từ thời điểm $$t$$: <br/>

$$G_t = \sum_{k=0}^{T-t-1} \gamma^k R_{t+k+1}$$

- Hàm giá trị cho trạng thái $$s$$:

$$v_{\pi}(s) = \mathbb{E}_{\pi}[G_t | S_t=s]$$

- Hàm <i>action-value</i> cho policy $$\pi$$ hay còn gọi là Q-value:

$$q_{\pi}(s, a) = \mathbb{E}_{\pi}[G_t | S_t=s, A_t=a]$$

- Giá trị trung bình toàn quá trình đối với một trạng thái bắt đầu $$s_0$$:

$$\eta = v_{\pi}(s_0)$$ 

- Trajectory - Chuỗi trạng thái và hành động có độ dài là $$t$$:

$$\tau = \{(s_k, a_k) | k=1...t\}$$

Các thuật toán thông dụng như Monte Carlo DP (Dynamic Programming), Q-Learning, Sarsa, hay thậm chí các mở rộng của chúng là n-<i>step</i> Q-Learning, Double Q-Learning, n-<i>step</i> Sarsa, Expected-Sarsa, TD($$\lambda$$)... đều sử dụng chung một cách thức là học các giá trị của các hành động (Q-value) và sau đó lựa chọn hành động bằng Q-value được ước lượng. REINFORCE đi theo một chiến lược khác là học một policy được <i>tham số hóa</i> và sau đó lựa chọn hành động mà không dựa theo giá trị ước lượng của Q-value. Các chiến lược như vậy được gọi theo một cách kỹ thuật là <b><i>Policy Gradient Methods</i></b>. Để tiện so sánh ở đây, tôi trích dẫn mã giả của hai thuật toán Q-Learning và Sarsa cùng với sự giải thich ngắn gọn bằng lời:<br/>
 
<div style="font-weight:700;">Q-Learning:</div>
![Q-Learning](/images/Q-Learning.png "Q-Learning")

<div style="font-weight:700;">Sarsa:</div>
![Sarsa](/images/Sarsa.png "Sarsa")

Q-Learning là một phương pháp off-policy, nghĩa là nó học không dựa trên policy hiện hữu nói nôm na chiến lược của Q-Learning khi học là lựa chọn hành động có Q-value lớn nhất cho trạng thái tiếp theo để update Q-value cho trạng thái hiện tại bất chấp rủi ro (kiểu muốn ăn nhiều thì phải liều). Sarsa, ngược lại là một phương pháp on-policy, nó lựa chọn hành động có Q-value theo policy hiện hữu để update vì vậy nó "an toàn" hơn so với Q-Learning. Một ví dụ cụ thể để so sánh hai phương pháp này có thể xem tại <b>Example 6.6: Cliff Walking</b> trong <i>R.Sutton 2nd</i>. 

Tuy nhiên, trong quá trình prediction để lựa chọn action cả hai phương pháp này đều sử dụng tới Q-value đã được ước lượng. Ở đây Q-value được ước lượng thông thường chứa bởi một bảng nếu số lượng trạng thái là không quá lớn hoặc một hàm ước lượng (thông thường là một neural network) nếu số lượng trạng thái là lớn. Hành động kế tiếp cho trạng thái hiện hữu sẽ được lựa chọn bởi công thức $$argmax_a[Q_{\theta}(s, a)]$$. Còn với REINFORCE nó sẽ lựa chọn hành động bởi công thức <span>$$argmax_a[\pi_{\theta}(a | s)]$$</span> ở đây <span>$$\pi_{\theta}(a | s)$$</span> là policy của hệ thống được tham số hóa bởi $$\theta$$. Nếu bạn đã quen thuộc với neural network bạn có thể tưởng tượng $$\theta$$ như các weight và <span>$$\pi_{\theta}(a | s)$$</span> là lớp softmax để dự đoán xác suất hành động với đầu vào của neural network là trạng thái hiện hữu. REINFORCE đảm bảo rằng việc thay đổi tham số $$\theta$$ từ policy sẽ dẫn đến việc gia tăng toàn bộ reward của quá trình. Định lý cho thuật toán REINFORCE được định nghĩa một cách công thức như sau (<i>Wiliams 1992</i>):

<div style="font-weight:700;">Theorem:</div>
> For any episodic REINFORCE algorithm, the inner product of <span>$$E\{\Delta\mathbf{W} | \mathbf{W}\}$$</span> and <span>$$\nabla_{\mathbf{W}}E\{r|\mathbf{W}\}$$</span> is nonnegative. Furthermore, if <span>$$ \alpha_{ij} > 0$$  for all $$i$$ and $$j$$, then this inner product is zero only when <span>$$\nabla_{\mathbf{W}}E\{r|\mathbf{W}\} = 0$$</span>. Also, if $$ \alpha_{ij} = \alpha$$ is independent of $$i$$ and $$j$$, then <span>$$E\{\Delta\mathbf{W} | \mathbf{W}\} = \nabla_{\mathbf{W}}E\{r|\mathbf{W}\}$$</span>.

Ở đây trong bài báo gốc, $$\Delta\mathbf{W}$$ được tính bởi công thức $$\Delta w_{ij}=\alpha_{ij}(r - b_{ij})\sum_{t=0}^{T}e_{ij}(t)$$ -  $$\mathbf{W}$$ là các tham số, $$\alpha_{ij}$$ là learning rate cho từng tham số, $$r$$ là reward cho mỗi bước và độc lập với thời gian, $$b_{ij}$$ là <i>reinforcement baseline</i> không phụ thuộc vào trajectory, và $$e_{ij}(t) = \delta \ln g_i(t) / \delta w_{ij}$$ gọi là <i>characteristic eligibility</i> cho $$w_{ij}$$ đối với timestep $$t$$. Trong bài viết này thì $$\mathbf{W}$$ tương ứng với $$\theta$$, $$g_i$$ tương ứng với <span>$$\pi_{\theta}(a | s)$$</span>, $$r$$ tương ứng với $$G_t$$. Chữ REINFORCE là viết tắt được viết tắt bởi "REward Increment = Nonnegative Factor x Offset Reinforcement x Characteristic Eligibility". Các bạn có thể xem chứng minh của định lý này ở phụ lục bài báo gốc, nó không quá khó để hiểu. Để dễ hiểu hơn với các ký hiệu trong bài, chúng ta sẽ chứng minh nó đối với MDP. Đẳng thức cần chứng minh <span>$$\nabla_{\mathbf{W}}E\{r|\mathbf{W}\} = E\{\Delta\mathbf{W} | \mathbf{W}\}$$</span> được viết lại là:

$$\alpha \nabla_{\theta}\mathbb{E}_{\pi_{\theta}}(G_t | \theta) = \mathbb{E}_{\pi_{\theta}}\left[ \alpha (G_t - b) \sum_{k=0}^{t} \nabla_{\theta}\ln \pi_{\theta}(a_k | s_k) \big| \theta\right]$$ 

Xác suất xảy ra $$G_t$$ là: <span>$$p_{G_t} = p(s_0)\prod_{k=0}^{t}p(s_{k+1}|s_t, a_t) \pi_{\theta}(a_t|s_t)$$</span> (do tính chất Markov Process). Như vậy: 

$$\mathbb{E}_{\pi_{\theta}}(G_t | \theta) = \int p_{G_t}.G_t d\tau$$

Gradient của <span>$$\mathbb{E}_{\pi_{\theta}}(G_t | \theta)$$</span> là:

$$
\begin{equation}
    \begin{split}
        \alpha \nabla_{\theta}\mathbb{E}_{\pi_{\theta}}(G_t | \theta) &= \alpha \int \nabla_{\theta}p_{G_t}.G_t d\tau \\
        &=\alpha \int p_{G_t} \nabla_{\theta}\ln p_{G_t}.G_t d\tau \\
        &=\mathbb{E}_{\pi_{\theta}}[\alpha \nabla_{\theta}\ln p_{G_t}.G_t | \theta] \\
        &=\mathbb{E}_{\pi_{\theta}}\left[\alpha G_t \sum_{k=0}^{t} \nabla_{\theta}\ln \pi_{\theta}(a_k | s_k) \big| \theta\right]
    \end{split}
\end{equation} 
$$

Vì baseline $$b$$ không phụ thuộc vào $$\tau$$ vì vậy ta sẽ có:

$$\int \nabla_{\theta}p_{G_t}.G_t d\tau = \int \nabla_{\theta}p_{G_t}.(G_t - b) d\tau$$

Do:

$$\int \nabla_{\theta}p_{G_t} b d\tau = b\int \nabla_{\theta}p_{G_t}d\tau = b\nabla_{\theta}1 = 0 $$

Vì thế:

$$\mathbb{E}_{\pi_{\theta}}\left[\alpha G_t \sum_{k=0}^{t} \nabla_{\theta}\ln \pi_{\theta}(a_k | s_k) \big| \theta\right] = \mathbb{E}_{\pi_{\theta}}\left[\alpha (G_t - b) \sum_{k=0}^{t} \nabla_{\theta}\ln \pi_{\theta}(a_k | s_k) \big| \theta\right]$$

Điều này dẫn tới đẳng thức cần chứng minh. Một câu hỏi đặt ra tại sao chúng ta lại cần baseline? Tác dụng của baseline về cơ bản là làm giảm phương sai của gradient nhưng vẫn giữ nguyên ước lượng:

$$\mathbf{Var}\left[(G_t - b) \sum_{k=0}^{t} \nabla_{\theta}\ln \pi_{\theta}(a_k | s_k) \big| \theta\right] = (G_t - b)^2 \mathbf{Var}\left[ \sum_{k=0}^{t} \nabla_{\theta}\ln \pi_{\theta}(a_k | s_k) \big| \theta\right]$$

Baseline $$b$$ càng gần với $$G_t$$ thì phương sai của gradient càng giảm xuống điều này giúp việc học ổn định hơn. Nếu trong một neural network nó sẽ giúp hạn chế rủi ro xảy ra của hiện tượng exploding và vanish gradient. Như vậy một cách tự nhiên $$b$$ sẽ là một ước lượng của $$G_t$$, nó có thể được học bởi bất kỳ kỹ thuật nào sử dụng cho ước lượng Q-value. Trong thực tế giá trị của gradient sẽ được tính bằng cách lấy trung bình của các mẫu:

$$\mathbb{E}_{\pi_{\theta}}\left[\alpha (G_t - b) \sum_{k=0}^{t} \nabla_{\theta}\ln \pi_{\theta}(a_k | s_k) \big| \theta\right] \approx \frac{1}{M}\sum_{m=0}^{M}\left[\alpha (G_t^m - b) \sum_{k=0}^{t} \nabla_{\theta}\ln \pi_{\theta}(a_k | s_k) \big| \theta\right]$$


REINFORCE cũng là một hệ quả của định lý Policy Gradient bạn có thể xem thêm tại chương 13 của <i>R.Sutton 2nd</i>. Dưới đây là mã giả của thuật toán REINFORCE không baseline và có baseline:

<div style="font-weight:700;">REINFORCE without baseline:</div>
![REINFORE_1](/images/REINFORCE.png "REINFORCE without baseline")

<div style="font-weight:700;">REINFORCE within baseline:</div>
![REINFORE_2](/images/REINFORCE_baseline.png "REINFORCE within baseline")

Việc sử dụng REINFORCE trong neural network là khá tự nhiên đặc biệt là Recurrent Neural Network (RNN) bởi một vài lý do. Nó được thiết kế ban đầu sử dụng cho neural network, định lý trên được chứng minh bằng cách sử dụng "unfolding-in-time" như trong RNN, các lớp ẩn trong neural network có thể tham số hóa policy dễ dàng, và đại lượng <span>$$\ln \pi_{\theta}(a_k | s_k)$$</span> thích hợp cho việc sử dụng thuật toán backprop thậm chí nó còn có thể kết hợp các thuật toán optimization như Momentum, RMSProp, Adam...

Ok, tất cả trên chỉ là lý thuyết xuông. Bạn sẽ cần một ví dụ để hiểu cách thức nó hoạt động. Ở đây tôi sẽ minh họa bằng một ví dụ đơn giản, giả sử hệ thống của bạn có 7 trạng thái khởi đầu là "A", "B", "C", "D", "E", "F", "G", các hành động là "next" hoặc "end". Hành động "next" sẽ dẫn một trạng thái "x" thành "x next" và hành động "end" sẽ dẫn một trạng thái "x end" là trạng thái kết thúc. Số lượng các hành động là không quá 8 và "gold actions" cho 7 trạng thái này để đạt được maximum reward khi reach tới trạng thái kết thúc:

- A -> next -> next -> end
- B -> next -> end
- C -> next -> next -> next -> end
- D -> next -> next -> end
- E -> next -> next -> next -> next -> end
- F -> next -> next -> next -> end
- G -> end

Source code được viết bằng PyTorch tại [đây](https://github.com/ChappiebotAI/engineering/tree/master/REINFORCE) mô phỏng cho hệ thống trên. Nó bao gồm các lớp embedding,  LSTM, lớp softmax để dự đoán xác suất hành động, và một lớp linear regression để ước lượng hàm giá trị trạng thái.

<div style="font-size: 75%;">
{% highlight python %}
class LSTM_REINFORCE(nn.Module):
    def __init__(self, using_cuda):
        super(LSTM_REINFORCE, self).__init__()
        self.embed_size = 10
        self.n_hidden= 30
        self.vocab_size = len(lexicons)
        self.n_action = 2
        self.discount_factor = 1.

        self.lexicons_embed = nn.Embedding(self.vocab_size, self.embed_size)
        self.action_lstm_cell = nn.LSTMCell(self.embed_size, self.n_hidden)
        self.hidden2action = nn.Linear(self.n_hidden, self.n_action)
        self.value_regression = nn.Linear(self.n_hidden, 1)

        self.using_cuda = using_cuda
{% endhighlight %}
</div>

Model được viết cho cả hai trường hợp REINFORCE, không baseline và có baseline. Trong trường hợp baseline, ở đây tôi không sử dụng thêm một model khác để dự đoán giá trị trạng thái mà sử dụng chung lớp embedding và LSTM của dự đoán hành động chỉ khác mỗi lớp cuối cùng là sử dụng linear regression. Việc làm này làm cho việc ước lượng hàm giá trị đơn giản hơn và nó cũng có thể sử dụng lại các feature của việc dự đoán hành động (xem <i>Rennie 2016</i>). Hai hàm `_sampling_action` và `_max_action` sử dụng cho việc sample action khi học và dự đoán action:

<div style="font-size: 75%;">
{% highlight python %}
    def _sampling_action(self, s, ihc):
        s = torch.LongTensor([s])
        s = autograd.Variable(s)
        if self.using_cuda: s = s.cuda()
        w_embed = self.lexicons_embed(s)
        h, c = self.action_lstm_cell(w_embed, ihc)
        value = self.value_regression(h)
        prob_logs = self.hidden2action(h)
        action_probs = F.softmax(prob_logs)

        action = torch.multinomial(action_probs, 1).cpu().data.numpy()[0][0]

        return value, action, torch.log(action_probs[0][action]), h, c
{% endhighlight %}
</div>
Hàm `_sampling_action` sẽ sampling action với đầu vào là trạng thái hiện tại ví. Trạng thái hiện là "A->next", lớp softmax dự đoán xác suất cho action tiếp theo là 0.4 cho "next" action và 0.6 cho "end" action thì nó sẽ sample action theo phân phối multinomial. Giả sử hành động được sample là "next" thì trạng thái tiếp theo là "A->next->next", và hành động được sample tiếp là "end" thì trạng thái tiếp là "A->next->next->end"...  

<div style="font-size: 75%;">
{% highlight python %}
    def _max_action(self, s, ihc):
        s = torch.LongTensor([s])
        s = autograd.Variable(s)
        if self.using_cuda: s = s.cuda()
        w_embed = self.lexicons_embed(s)
        h, c = self.action_lstm_cell(w_embed, ihc)
        value = self.value_regression(h)
        prob_logs = self.hidden2action(h)
        action_probs = F.softmax(prob_logs)
        max_value, idx = action_probs.max(1)

        action = idx[0].cpu().data.numpy()[0]
        return value, action, h, c
{% endhighlight %}
</div>

Hàm `_max_action` là tương tự như hàm `_sampling_action` duy chỉ một điều là nó không lấy sample action mà nó sẽ lấy hành động có xác xuất cao nhất cho trạng thái hiện tại. Bằng cách sử dụng hàm `_sampling_action` cứ một step trong việc học nó sẽ sample các episode. Episode sẽ chứa các giá trị như giá trị trạng thái được ước lượng, giá trị $$\ln$$ của xác suất hành động để phục cho việc tính toán gradient:

<div style="font-size: 75%;">
{% highlight python %}
    def sampling_episode(self, batch):
        episodes = []

        for s in batch:
            episode = []
            state = [lexicons[s],]
            ga = gold_actions[state[0]]

            ihc = self.lstm_init_hidden(n_unit=self.n_hidden)
            value, action, prob_log, h, c = self._sampling_action(s, ihc)  # sampling init action
            na = state_actions[action]
            next_state = state + [na,]  # compute next state
            i = 0
            g_t = 0.

            while next_state[-1] != "end" and i < MAX_LEN_SEQ:
                if i < len(ga) and next_state[-1] == ga[i]:
                    reward = 0.5
                else:
                    reward = -1.

                g_t = g_t * self.discount_factor + reward
                step = (state, na, g_t, value, prob_log)
                episode.append(step) # Store a step
                state = next_state

                value, action, prob_log, h, c = self._sampling_action(lexicons.index(state[-1]), (h, c))
                i += 1
                na = state_actions[action]
                next_state = state + [na, ]  # compute next state

            if i == (len(ga) - 1) and next_state[-1] == ga[i]:
                reward = 2.
            elif next_state[-1] == "end":
                reward = -0.5
            else:
                reward = -2.
            g_t = g_t * self.discount_factor + reward
            step = (state, na, g_t, value, prob_log)
            episode.append(step)
            episodes.append(episode)
            continue

        return episodes
{% endhighlight %}
</div>

PyTorch sẽ lo việc tính toán gradient cho bạn (bằng backprop), việc của chúng ta là định nghĩa hàm loss sao cho khi PyTorch tính gradient là như công thức gradient của REINFORCE:

<div style="font-size: 75%;">
{% highlight python %}
    def calc_loss(self, episodes):
    loss = 0.
    num_step = 0
    for ep in episodes:
        num_step += len(ep)
        for i,step in enumerate(ep):
            #loss -= (step[2] * step[4] * math.pow(self.discount_factor, i))   # uncommen if dont use baseline
            loss -= ((step[2] - step[3]) * step[4] * math.pow(self.discount_factor, i) - (step[2] - step[3]) * (step[2] - step[3]))
    loss /= num_step

    return loss
{% endhighlight %}
</div>

Bạn sẽ cần tự giải thích hàm `calc_loss` tại sao nó làm việc cho trường hợp sử dụng baseline coi như một bài tập nhỏ.

Có rất nhiều ứng dụng sử dụng REINFORCE, không chỉ trong ngành game mà còn trong các ngành khác như NLP, marketing, computer vision... REINFORCE cũng là nền tảng cho nhiều thuật toán Evoluation Strategy (ES), một thông tin khá thú vị gần đây một nhóm sinh viên MIT ở [labsix](http://www.labsix.org) thực hiện adversarial attack vào Google Cloud Vision dựa trên thuật toán Natural Evoluation Strategy (NES). Hiện tại, trong sản phẩm [OtoNhanh.vn](https://otonhanh.vn) chúng tôi đã và đang ứng dụng REINFORCE vào bài toán remarketing, cũng như một số vấn đề về NLP (generative model, semantic parsing, chatbot, ...). 
  
### Tài liệu tham khảo:
- <i>Williams 1992</i>: Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning.
- <i>Rennie 2016</i>: Self-critical Sequence Training for Image Captioning. 
- <i>V. Serban 2017</i>: A Deep Reinforcement Learning Chatbot
- <i>R.Sutton 2016</i>: Reinforcement Learning -  A Introduction 
- <i>Ronen Tamari 2016</i>: REINFORCE Framework for Stochastic Policy Optimization and its use in Deep Learning
- [http://www.labsix.org](http://www.labsix.org/partial-information-adversarial-examples/): Partial Information Attacks on Real-world AI
- <i>V.Zhong 2017</i>:Seq2SQL: Generating Structured Queries from Natural Language using Reinforcement Learning