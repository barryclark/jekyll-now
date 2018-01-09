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

Baseline $$b$$ càng gần với $$G_t$$ thì phương sai của gradient càng giảm xuống điều này giúp việc học ổn định hơn. Nếu trong một neural network điều này giúp hạn chế rủi ro xảy ra của hiện tượng exploding và vanish gradient. Như vậy một cách tự nhiên $$b$$ sẽ là một ước lượng của $$G_t$$, nó có thể được học bởi bất kỳ kỹ thuật nào sử dụng cho ước lượng Q-value. Trong thực tế giá trị của gradient sẽ được tính bằng cách lấy trung bình của các mẫu:

$$\mathbb{E}_{\pi_{\theta}}\left[\alpha (G_t - b) \sum_{k=0}^{t} \nabla_{\theta}\ln \pi_{\theta}(a_k | s_k) \big| \theta\right] \approx \frac{1}{M}\sum_{m=0}^{M}\left[\alpha (G_t^m - b) \sum_{k=0}^{t} \nabla_{\theta}\ln \pi_{\theta}(a_k | s_k) \big| \theta\right]$$


REINFORCE cũng là một hệ quả của định lý Policy Gradient bạn có thể xem thêm tại chương 13 của <i>R.Sutton 2nd</i>. Dưới đây là mã giả của thuật toán REINFORCE không baseline và có baseline:

<div style="font-weight:700;">REINFORCE without baseline:</div>
![REINFORE_1](/images/REINFORCE.png "REINFORCE without baseline")

<div style="font-weight:700;">REINFORCE within baseline:</div>
![REINFORE_2](/images/REINFORCE_baseline.png "REINFORCE within baseline")