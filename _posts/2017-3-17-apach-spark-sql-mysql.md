---
layout: post
title: apache spark와 mysql 연동 하기
---

1. pom.xml에 depencendy 추가
{% highlight xml %}
	<!-- Spark core -->
	<dependency>
		<groupId>org.apache.spark</groupId>
		<artifactId>spark-core_2.11</artifactId>
		<version>2.1.0</version>
	</dependency>
	<!-- Spark sql -->
	<dependency>
		<groupId>org.apache.spark</groupId>
		<artifactId>spark-sql_2.11</artifactId>
		<version>2.1.0</version>
	</dependency>
	<!-- mysql driver -->
	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<version>5.1.37</version>
	</dependency>
{% endhighlight %}


2. SimpleDataApp.java 생성
{% highlight java %}
package org.dongchimi.spark;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

public class SimpleDataApp {
	public static void main(String[] args) {
		
		// Spark 기본 설정.
	    SparkConf conf = new SparkConf().setMaster("local").setAppName("Simple Application");
	    JavaSparkContext sc = new JavaSparkContext(conf);
	    
	    // session 설정.
		SparkSession spark = SparkSession
				  .builder()
				  .appName("Java Spark SQL basic example")
				  .config("spark.sql.shuffle.partitions", 6)
				  .getOrCreate();
		
		// db 및 테이블 설정
		String url =  "jdbc:mysql://yourHostname:3306/yourDatabaseName";
		Dataset<Row> load = spark
				  .read()
				  .format("jdbc")
				  .option("driver", "com.mysql.jdbc.Driver")
				  .option("url", url)
				  .option("user", "yourUserName")
				  .option("password", "'yourPassword")
				  .option("dbtable", "yourTableName")
				  .load();
		

		load.show();
		// Dataset<Row> count = load.groupBy("RECORD_DATE").count().orderBy("count");
		// count.show();
	  }
}
{% endhighlight %}