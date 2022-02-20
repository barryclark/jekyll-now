---
layout: post
title: Unit Testing iOS Developer
published: true
---

Unit Testing

Berapa banyak dari anda yang menulis code disertai dengan unit testing? atau bahkan anda baru pertama kali mendengar tentang unit testing? Jika itu benar maka hal itu bukanlah hal yang buruk.
Semua berawal dari ketidaktauhan kemudian belajar dan menjadi tau.

Oke, apa itu unit testing?
Unit testing adalah proses pengujian terhadap fungsi, method, atau langkah dari code yang kita bikin. Sederhananya kita menulis code untuk membuktikan bahwa code yang kita tulis mempunyai output seperti yang seperti kita harapkan. Sehingga code yang kita tulis dapat dipertanggungjawabkan karena sudah melalui proses pembuktian, selain itu jika suatu saat dimasa depan kita akan me-refactor code kita yang pernah kita tulis, dengan unit testing dapat kita jaga agar hasilnya tetap seperti yang kita harapkan.

Unit Testing di iOS Development
Sebagai iOS Developer kita juga dapat menulis unit test pada project kita, untuk melakukan unit test ini dapat dilakukan dengan mudah karena XCode sudah menyediakannya sehingga tidak perlu menggunakan 3rd party framework untuk melakukan unit test. Untuk melakukan unit test dengan XCode dapat dilakukan dengan cara berikut.

![add new target](https://raw.githubusercontent.com/wsnjy/wsnjy.github.io/master/images/assets/target.jpg)

pada editor pilih File->New->Target 


![Testing Bundle](https://raw.githubusercontent.com/wsnjy/wsnjy.github.io/master/images/assets/bundle.jpg)

setelah itu akan muncul window dialog yang akan menampilkan pilihan new target, pilih unit testing bundle kemudian pilih next


![Add Unit Test](https://raw.githubusercontent.com/wsnjy/wsnjy.github.io/master/images/assets/unittesttest.jpg)

kemudian akan muncul setup pada new target yang akan dibuat, pilih nama sesuai yang anda inginkan saja. Kemudian pilih lanjut.


Mulai Menulis Unit Test
Untuk kasus kali ini saya akan menggunakan code dibawah untuk menuliskan unit testnya. Code tersebut merupakan sebuah method dimana method tersebut akan mengeprint "Fizz" untuk input yang merupakan 3 dan kelipatannya, "Buzz" untuk 5 dan kelipatannya dan "FizzBuzz" untuk kelipatan 3 dan 5.

    func fizzBuzz(input: Int) -> String {
        
        guard input > 0 else {
            return ""
        }

        if input % 15 == 0 {
            return "FizzBuzz"
        } else if input % 3 == 0 {
            return "Fizz"
        } else if input % 5 == 0 {
            return "Buzz"
        }
        
        return ""
    }


Untuk memulai menulis unit test code diatas, kita beralih ke unit testting target yang sudah bikin tadi. Bisa bikin new file atau pakai aja file yang sudah tergenerate. Kita pakai aja file yang sudah tergenerate, hapus semua code didalam classnya kemudian kita mulai tulis unit testnya. Kira-kira unit test yang kita tulis akan seperti ini:

        import XCTest
        @testable import UnitTest

        class UnitTestTests: XCTestCase {

            
            func test_when_input_zero_print_empty() {
                let sut = ViewController()
                let input = 0
                XCTAssertEqual(sut.fizzBuzz(input: input), "")
            }
            
            func test_when_input_three_or_multiple_three_print_fizz() {
                let sut = ViewController()
                let input = 3
                XCTAssertEqual(sut.fizzBuzz(input: input), "Fizz")
            }
            
            func test_when_input_five_or_multiple_fize_print_buzz() {
                let sut = ViewController()
                let input = 5
                XCTAssertEqual(sut.fizzBuzz(input: input), "Buzz")
            }
            
            func test_when_input_15_print_fizzBuzz() {
                let sut = ViewController()
                let input = 15
                XCTAssertEqual(sut.fizzBuzz(input: input), "FizzBuzz")
            }
        }


untuk menjalankan unit test tersebut dapat kita tekan "Command + U", hasilnya terlihat seperti berikut ini:

![Result Testing](https://raw.githubusercontent.com/wsnjy/wsnjy.github.io/master/images/assets/running.jpg)

terlihat bahwa indicator hijau menandakan bahwa hasil test berjalan lancar, jika hasil test berjalan dengan baik seperti itu maka kita sudah lebih tenang dalam menulis code atau coding karena code kita sudah teruji dengan unit test yang kita buat. Oke, mungkin sekian dulu pembahasan tentang unit test pada iOS Development. Jika ada pertanyaan jangan ragu untuk bertanya. Terima Kasih
