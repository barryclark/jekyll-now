---
layout: post
title: Embedded-Programmierung mit dem STM32
lang: DE
ref: Embedded
categories: [cansat2019]
teaserImage: /images/posts/2019-04-12_STM-unpacked.jpg
---

Wer unsere Social-Media-Kanäle und unsere [Blogposts](/Hardwareauswahl_2019/#prozessor) aufmerksam verfolgt, weiß, dass wir den [STM32H743ZI](https://www.st.com/resource/en/datasheet/stm32h743zi.pdf) von STMicroelectronics als Prozessor hernehmen möchten. Wie das genau aussehen soll, werden wir euch in diesem Blogpost erklären.

## Der Chip

{% include post-figure.html path="/images/posts/2019-04-12_STM-unpacked.jpg" alignment="right" image_size="small" %}

Den STM32H743ZI haben wir uns nicht nur wegen seines leicht einprägsamen Namens ausgesucht, sondern vor allem aufgrund seiner herausragenden Performance. Der Prozessor basiert auf dem [ARM Cortex M7](https://developer.arm.com/ip-products/processors/cortex-m/cortex-m7) und ist einem [Arduino Nano](https://store.arduino.cc/arduino-nano) weit überlegen: Mit 400&nbsp;MHz (25 mal schneller) und 1&nbsp;MByte RAM (500 mal mehr) wird es ein Leichtes sein, mehrere Messdaten sowie die Bilder gleichzeitig aufzuzeichnen.

## Endlich kein C mehr!

Bei der Programmierung von Arduinos und generell im Embedded-Bereich ist C mit Abstand die am weitesten verbreitete Sprache. Doch C birgt einige Schwierigkeiten für Entwickler, wie zum Beispiel das Umgehen mit Pointern oder das Verhindern von Speicherzuordnungsfehlern (besser bekannt als *Memory Allocation Error*).

Deswegen haben wir uns entschieden, die Programmiersprache [Rust](https://www.rust-lang.org/) zu verwenden. Das Mozilla-Projekt ist nicht nur modern und macht mehr Spaß; dank dem [Ownership-Prinzip](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) können keine Speicherzuordnungsfehler mehr auftreten, ohne Abstriche in der Performance zu machen, denn Rust kommt ohne Laufzeit-Garbage-Collector aus. Viele Fehler werden bei Rust bereits beim Kompilieren (und nicht erst zur Laufzeit) abgefangen, außerdem müssen wir uns nicht mit Pointern herumärgern.

## [Rust Embedded](https://www.rust-lang.org/what/embedded)

Im Rust-Embedded-Bereich ist es zweckmäßig, einen sogenannten [Hardware Abstraction Layer (HAL)](https://docs.rust-embedded.org/book/portability/index.html) für seinen Chip zu verwenden. Dieser schafft einheitliche Schnittstellen für übergeordnete Anwendungen – völlig unabhängig davon, welcher Prozessor eigentlich zu Grunde liegt. Dies ermöglicht es uns, später doch einen anderen Chip herzunehmen, ohne unsere CanSat-Software verwerfen zu müssen.

Konkret benötigen wir also eine Implementierung des [embedded-hal-Projekts](https://github.com/rust-embedded/embedded-hal) für den STM32H743ZI. [Einige STM32-Chips](https://github.com/rust-embedded/awesome-embedded-rust#stmicroelectronics-1) werden zwar schon unterstützt, aber die STM32H7-Reihe ist noch nicht dabei. Also müssen wir das selber machen.

Zudem benötigen wir für die Sensoren und weiteren Komponenten, die wir mit dem STM ansteuern wollen, passende Treiber. Manche davon existieren schon, andere müssen wir ebenfalls selbst entwickeln.

Sobald wir das alles mithilfe der Spezifikationen, Datenblätter und Handbücher des Chips und der Sensoren erledigt haben, können wir mit diesen arbeiten und das eigentliche CanSat-Programm zum Sammeln und Speichern unserer Daten schreiben.

{% include post-figure.html path="/images/posts/2019-04-12_STM-testing.jpg" alignment="center" image_size="big" caption="Unser Testaufbau des STM-Development-Boards mit einigen Sensoren." %}

Eine Schwierigkeit ist allerdings noch, wie wir unser Programm auf den STM flashen werden. Denn da gibt es noch recht wenig Support aus der Open-Source-Community. Mit dem offiziellen Werkzeug-Bundle [STM32Cube](https://www.st.com/en/ecosystems/stm32cube.html) können wir zwar flashen, jedoch nicht über das Command-Line-Interface (CLI) debuggen. Dies könnte jedoch mit einer Development-Version von [OpenOCD](http://openocd.org/) klappen, welche dem [GNU Project Debugger (GDB)](https://www.gnu.org/software/gdb/) das Debuggen ermöglichen könnte.

## Und wie weit sind wir?

Federführend bei der Software ist [Henrik](/team/#henrik), der schon letztes Jahr diese Rolle inne hat. Außerdem beteiligt sich [Johanna](/team/#johanna) bei der Implementierung der Treiber. Momentan sind die beiden noch mit dem HAL beschäftigt: Die GPIO-Implementierung konnte mit ein paar Anpassungen aus einem anderen [Rust-Projekt für den STM32H7](https://github.com/saschagrunert/stm32h7-rs) übernommen werden. Laut Datenblatt richtig implementiert ist die Reset and Clock Control (RCC), jedoch funktioniert diese noch nicht. Das ist relativ problematisch, da wir ohne funktionierende Clock im Prinzip gar nichts machen können. Sobald das gefixt ist, müssen noch [I²C](https://de.wikipedia.org/wiki/I%C2%B2C), [SPI](https://de.wikipedia.org/wiki/Serial_Peripheral_Interface) und [UART](https://de.wikipedia.org/wiki/Universal_Asynchronous_Receiver_Transmitter) implementiert werden, da diese für die Ansteurung der Sensoren benötigt werden. Die Fertigstellung des HAL und der benötigten Treiber sind der erste Meilenstein, den wir gerade anvisieren.

Die Erfahrung aus unserer letztjährigen Teilnahme zeigt aber auch, dass sich selten etwas so entwickelt, wie wir es uns anfangs vorgestellt haben. Gut möglich also, dass wir die Planung nochmals umwerfen und doch ein anderes System verwenden. Darüber werden wir euch aber wieder genauestens informieren!
