---
layout: post
title: Descargar registros desde SQL Server con POWERSHELL
---

Bienvenido a mi primer artículo donde te enseñaré a descargar una tabla de registros desde SQL server a CSV con Powershell.

## Aquí el código en Powershell

```Powershell

#Cadena de conexión
$BaseDeDatos = "DB_Ejemplo"
$Servidor = "Servidor_Ejemplo"

#Archivo a exportar
$AttachmentPath1 ='D:\archivo.csv'


# Escribe tu sentencia SQL para extraer tu tabla
$SqlQuery1 = "Select * From Tu_Tabla"

$SqlConnection = New-Object System.Data.SqlClient.SqlConnection
$SqlConnection.ConnectionString = "Server = $Servidor; Database = $BaseDeDatos; Integrated Security = True"
$SqlCmd = New-Object System.Data.SqlClient.SqlCommand
$SqlCmd.CommandText = $SqlQuery1
$SqlCmd.Connection = $SqlConnection
$SqlAdapter = New-Object System.Data.SqlClient.SqlDataAdapter
$SqlAdapter.SelectCommand = $SqlCmd
$DataSet = New-Object System.Data.DataSet
$nRecs = $SqlAdapter.Fill($DataSet)
$nRecs | Out-Null
#Populate Hash Table
$objTable = $DataSet.Tables[0]
#Export Hash Table to CSV File
$objTable | Export-CSV $AttachmentPath1 -NoTypeInformation
```

Espero les sirva :)

![un gatito](https://dwa5x7aod66zk.cloudfront.net/assets/sdp-backpack-a64038716bf134f45e809ff86b9611fb97e41bbd2ccfa3181da73cf164d3c200.png)
