# UITableView
### Master-Detail 애플리케이션.
- Single View application이 아닌, Master-Detail application으로 생성한다. 

- MasterViewController.swift가 마스터 화면 전용 프로그램 파일.

- DetailViewController.swift가 상세 화면 전용 프로그램 파일임.

- 기본적으로 추가, 삭제, 수정 기능을 포함하고 있음 .

  ​

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



