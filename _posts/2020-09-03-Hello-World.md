# Better networking with Moya Network

Nếu các bạn là một dev iOS thì chắc hẳn bạn đã từng triển khai một số lệnh gọi REST trong ứng dụng của mình. Và thư viện phổ biến nhất hỗ trợ việc này là <b>Alamofire</b>. Mình cũng đã sử dụng thư viện này và những vấn đề mình tin rằng các bạn hay gặp phải khi sử dụng thư viện <b>Alamofire</b> là:

- Không biết phải bắt đầu như thế nào?
- Gặp khó khăn khi maintain app
- Khó khăn khi viết unit tests

Vì vậy hôm nay chúng ta sẽ thử Moya, một trình bao bọc <b>Alamofire</b> sẽ giúp chúng ta giải quyết những vấn đề trên như thế nào.

### Getting Started
- Đầu tiên chúng ta cần import thư viện vào project

##### CocoaPods
<pre>
    pod 'Moya', '~> 14.0'
</pre>

##### Carthage
<pre>
    github "Moya/Moya" ~> 14.0
</pre>

### Setup APIService

Chúng ta cần tạo một enum chứa tất cả các API của bạn.

<pre>
    enum APIService {
        case posts
        case postsWith(id: Int)
    }
</pre>

Sau đó chúng ta cần implement <b>TargetType</b> của Moya. Nó bao gồm 7 properties: baseUrl, path, method, sampleData, task, validate, header.

<pre>
extension APIService: TargetType {

    var baseURL: URL {
        return URL.init(string: "https://jsonplaceholder.typicode.com/")!
    }
    
    var path: String {
        switch self {
        case .posts:
            return "posts"
        case .postsWith(let id):
            return "posts/\(id)"
        }
    }
    
    var method: Moya.Method {
        switch self {
        case .posts, .postsWith:
            return .get
        }
    }
    
    var sampleData: Data {
        switch self {
        case .posts:
            return Data.init(forResouce: "Posts", ofType: "json")
        case .postsWith:
            return Data()
        }
    }
    
    var task: Task {
        switch self {
        case .posts, .postsWith:
            return .requestPlain
        }
    }
    
    var headers: [String: String]? {
        var headers: [String: String] = [:]
        headers["Content-type"] = "application/json"
        return headers
    }
}
</pre>

### Setup NetworkManager

Chúng ta cần tạo một NetworkManager và một protocol Networkable. Networkable này sẽ là nơi để chúng ta định nghĩ các method mà bạn muốn sử dụng.

<pre>
protocol Networkable {
    var provider: MoyaProvider<JSONPlaceHolderAPI> { get }
    
    func getPosts() -> Single<[Post]>
    func getPostWith(id: Int) -> Single<Post>
}

class NetworkManager: Networkable {
    
    var provider = MoyaProvider<JSONPlaceHolderAPI>()
    
    func getPosts() -> Single<[Post]> {
        return provider.rx.request(.posts)
            .filterSuccessfulStatusCodes()
            .map([Post].self)
    }
    
    func getPostWith(id: Int) -> Single<Post> {
        return provider.rx.request(.postsWith(id: id))
            .filterSuccessfulStatusCodes()
            .map(Post.self)
    }
}
</pre>

Tại đây chúng ta cần tạo thêm một model Post để lưu trữ và sử lý dữ liệu.
<pre>
typealias Codable = Encodable & Decodable

struct Post: Codable {
    
    var userId: Int
    var id: Int
    var title: String
    var body: String
    
    enum CodingKeys: String, CodingKey {
        case userId, id, title, body
    }
}
</pre>

#### Plugins
Ngoài ra  Moya còn có sẵn nhưng plugin tiện lợi phục vụ cho việc debug hay tracking data dễ dàng hơn.

<pre>
var provider = MoyaProvider<JSONPlaceHolderAPI>(plugins: [NetworkLoggerPlugin(configuration: .init(logOptions: .verbose))])
</pre>

### Vậy là chúng ta đã xong phần setup, bạn có thể tham khảo source code tại đây: <link>



