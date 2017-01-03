### Master-Detail 애플리케이션 ###
- Single View application이 아닌, Master-Detail application으로 생성한다. 
- MasterViewController.swift가 마스터 화면 전용 프로그램 파일.
- DetailViewController.swift가 상세 화면 전용 프로그램 파일임.
- 기본적으로 추가, 삭제, 수정 기능을 포함하고 있음 .



#### 편집 기능에 대한 부분(기본 내장)

```swift
override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.navigationItem.leftBarButtonItem = self.editButtonItem

        let addButton = UIBarButtonItem(barButtonSystemItem: .add, target: self, action: #selector(insertNewObject(_:)))
        self.navigationItem.rightBarButtonItem = addButton
        if let split = self.splitViewController {
            let controllers = split.viewControllers
            self.detailViewController = (controllers[controllers.count-1] as! UINavigationController).topViewController as? DetailViewController
        }
    }
```



####  데이터 편집 메서드

- insert 메서드

```swift
  func insertNewObject(_ sender: Any) {
        objects.insert(NSDate(), at: 0)
        let indexPath = IndexPath(row: 0, section: 0)
        self.tableView.insertRows(at: [indexPath], with: .automatic)
    }
```



- 수정시 해당 작업에 대한 flag 처리 메서드

- 수정&삭제 처리구현 메서드

  ```swift
  override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
          // Return false if you do not want the specified item to be editable.
          return true
      }
      

  override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
          if editingStyle == .delete {
              objects.remove(at: indexPath.row)
              tableView.deleteRows(at: [indexPath], with: .fade)
          } else if editingStyle == .insert {
              // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view.
          }
      }
  ```



####  사진 목록 어플리케이션 예제.

- 다음 예제는 위의 기본 내장 수정&추가&삭제 부분이 전부 주석으로 처리 해놓고 한다.

  ​

  ####  MasterViewController.swift

  ```swift

  import UIKit

  class MasterViewController: UITableViewController {
      
      var detailViewController: DetailViewController? = nil
      // 초기 데이터
      var objects = [
          "fireworks001", "fireworks002", "fireworks003", "fireworks004",
          "fireworks005", "fireworks006", "fireworks007", "야마토", "사이", "나루토",]
      // 보여질 데이터 이름을 저장함. 
      
      override func viewDidLoad() {
          super.viewDidLoad()
          
          // 마스터 화면의 타이틀 문자
          self.title = "Main_테이블뷰 예제_사진목록"
          
          
      }
      
      @IBAction func returnTop(segue: UIStoryboardSegue){
      
      }
      
      // 기본 내장
      override func viewWillAppear(_ animated: Bool) {
          self.clearsSelectionOnViewWillAppear = self.splitViewController!.isCollapsed
          super.viewWillAppear(animated)
      }
      
      // 기본 내장
      override func didReceiveMemoryWarning() {
          super.didReceiveMemoryWarning()
          // Dispose of any resources that can be recreated.
      }
      
      // MARK: - Segues
      
      override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
          if segue.identifier == "showDetail" {
              if let indexPath = self.tableView.indexPathForSelectedRow {
                  // 문자열 데이터로 수정
                  let object = objects[indexPath.row]
                  let controller = (segue.destination as! UINavigationController).topViewController as! DetailViewController
                  controller.detailItem = object as AnyObject?
                  controller.navigationItem.leftBarButtonItem = self.splitViewController?.displayModeButtonItem
                  controller.navigationItem.leftItemsSupplementBackButton = true
              }
          }
      }
      
      // MARK: - Table View
      
      override func numberOfSections(in tableView: UITableView) -> Int {
          return 1
      }
      
      override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
          return objects.count
      }
      
      // 테이블 뷰
      override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
          let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
          
          // 문자열 데이터로 수정
          let object = objects[indexPath.row]
          // 문자열 데이터로 수정
          cell.textLabel!.text = object
          return cell
      }
  }

  ```



#### DetailViewController.swift

```swift

import UIKit

class DetailViewController: UIViewController {
    
    @IBOutlet weak var photoImageView: UIImageView!
    
    // 함수 생성. -> 사진에 대한 이미지를 imageView객체 타입으로 저장
    func configureView() {
        // Update the user interface for the detail item.
        if let detail = self.detailItem {
            if let imageView = self.photoImageView {
                let fileName = "\(detail).jpg"
                // 이름.jpg형식으로 처리.
                imageView.image = UIImage(named: fileName)
            }
        }
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.configureView() // 함수 호출
        
        // 상세 화면의 타이틀 문자
        self.title = "불꽃놀이 사진"
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    //업데이트 처리
    var detailItem: AnyObject? {
        didSet {
            // Update the view.  업데이트 처리.
            self.configureView()
        }
    }
    
    
}


```

