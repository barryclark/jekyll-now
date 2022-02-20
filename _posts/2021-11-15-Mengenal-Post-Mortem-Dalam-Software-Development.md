---
layout: post
title: Mengenal Post Mortem Dalam Software Development
published: true
---

Dalam membangun software seringkali kita menjumpai sebuah kesalahan pada program yang kita buat yang menyebabkan bug dan program tidak berjalan sebagaimana semestinya. Dampak hal ini bisa kecil maupun malah bisa besar bahkan dapat menyebabkan kehilangan uang pada suatu perusahaan dikarenakan bug tersebut. Jika sudah terjadi maka yang perlu dilakukan oleh software developer dan perusahaan adalah memastikan bahwa hal tersebut tidak boleh terjadi lagi, untuk itu dilakukan proses yang bernama post-mortem.

!(bug)[images/assets/bug.png]

Apa itu Post-Mortem?
Post Mortem dalam software development adalah dimana sebuah team melihat kembali apa yang salah dengan apa yang telah mereka lakukan, kemudian mendokumentasikan, mengubah proses, dan mencegah kesalahan tersebut terjadi lagi. Selain itu post-mortem bukan untuk mencari kambing hitam dari sebuah kesalahan tapi hal ini digunakan sebagai sarana pembelajaran dan mencegah kesalahan tersebut terulang kembali.

Mengapa harus melakukan Post Mortem?
Salah satu tujuan post-mortem adalah kita bisa berhenti untuk melakukan kesalahan yang sama berulang-ulang selain itu software kita jadi lebih kuat dan stabil dari yang sebelumnya. Jika hal tersebut terpenuhi maka kemungkinan loss-money perusahaan yang disebabkan oleh bug dapat terhindari. Kesalahan-kesalahan yang terdokumentasi dengan baik dapat menjadikan pembelajaran dikemudian hari yang sangat bermanfaat.

Contoh Penulisan Post-Mortem

Dibawah ini adalah contoh format post mortem yang pernah saya tulis ketika dahulu terjadi kesalahan karena code yang saya buat. Mungkin bisa saja diluar sana banyak format lain yang tersedia, namun intinya kita dapat menjelaskan dengan singkat dan gamblang tentang apa yang terjadi dan mendapatkan solusi dari post mortem tersebut.

| --- | --- |
| --- | --- |
| Postmortem owner | iOS  |
| Version | 4.x.x |
| Priority | Medium |
| Affected Module | Payment Module |
| Release Target | 01-01-2020 |

 Postmortem report
| Instruction | Report |
| --- | --- |
| Problem | Jelaskan dari inti permasalahan  |
| Affected Module | Jelaskan Module atau bagian program mana yang terdampak  |
| Root Couse | Jelaskan Penyebab utama dari masalah  |
| Recovery |Jelaskan  Langkah penanggulangan dari permasalahan tersebut  |
|  Lessons learned | Jelaskan Pelajaran yang didapat dan cara agar tidak terjadi lagi  |
| Who Fixing | Berisi siapa yang memperbaiki  |
| CC | Mention orang-orang yang berkepentingan  |
| Meeting Link | Link Meeting untuk penjelasan dari post mortem ini  |

Kesimpulan

Post mortem bukan mencari kesalahan atau kambing hitam dari sebuah kesalahan namun untuk mencegah kejadian serupa terulang kembali. Dengan post mortem software yang kita buat akan jadi lebih kuat dan baik karena dapat menghindari kesalahan-kesalahan yang pernah diperbuat. Post mortem adalah salah satu hal yang penting dalam software development dan dapat menjadikan bahan pembelajaran dalam menulis code-code yang baru. Demikian penjelasan postmortem dalam dunia software development, jika ada pertanyaan boleh ditanyakan kepada saya.
Terima kasih sudah membaca!!! Salam!