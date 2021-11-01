package lab2;

import com.amazon.ion.*;
import com.amazon.ion.system.*;
import com.amazon.ion.util.*;

import software.amazon.awssdk.services.qldbsession.*;
import software.amazon.qldb.*;
import software.amazon.qldb.exceptions.TransactionAbortedException;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;


public class App {

    public static void main(String[] args) throws Exception {
        //buildAndWriteIon();
        //readAndUpdateIon();
        //deleteDocument();
        //abortUpdate();
        //updateIonForOcc();
        //readFromJsonTargetedReplacement();
        //parseFromJson();
    }


    private static void buildAndWriteIon() throws Exception {
        IonSystem ionSys = IonSystemBuilder.standard().build();

        IonStruct personDocument = ionSys.newEmptyStruct();

        personDocument.put("PersonId").newString("123456789");
        personDocument.put("FirstName").newString("John");
        personDocument.put("LastName").newString("Doe");
        personDocument.put("MoneyInWallet").newDecimal(new BigDecimal("31.24"));
        personDocument.put("DateOfBirth").newTimestamp(Timestamp.forDay(1970, 7, 4));
        personDocument.put("NumberOfLegs").newInt(2);
        personDocument.put("LikesGreenBeans").newBool(false);

        IonList items = personDocument.put("ThingsInPocket").newEmptyList();
        items.add().newString("keys");
        items.add().newString("pocketknife");
        items.add().newString("lint");
        items.add().newString("pack of gum");

        IonStruct homeAddress = personDocument.put("HomeAddress").newEmptyStruct();
        homeAddress.put("Street1").newString("123 Main Street");
        homeAddress.put("City").newString("Beverly Hills");
        homeAddress.put("State").newString("CA");
        homeAddress.put("Zip").newString("90210");

        IonStruct workAddress = ionSys.newEmptyStruct();
        workAddress.put("Street1").newString("12 Elm Street");
        workAddress.put("City").newString("Los Angeles");
        workAddress.put("State").newString("CA");
        workAddress.put("Zip").newString("90001");
        personDocument.put("WorkAddress", workAddress);

        System.out.println(personDocument.toPrettyString());

        QldbSessionClientBuilder sessionClientBuilder = QldbSessionClient.builder();
        QldbDriver driver = QldbDriver
          .builder()
          .ledger("ion-lab")
          .sessionClientBuilder(sessionClientBuilder)
          .build();

        Result result = driver.execute(txn -> {
              return txn.execute("INSERT INTO Person VALUE ?", personDocument);
        });

        String documentId = null;
        Iterator<IonValue> iter = result.iterator();
        while (iter.hasNext()) {
            IonValue obj = iter.next();
            if (obj instanceof IonStruct) {
                IonStruct val = (IonStruct) obj;
                IonString str = (IonString) val.get("documentId");
                documentId = str.stringValue();
                break;
            }
        }

        System.out.println("\n\nInserted Person document:  " + documentId + "\n\n");
    }


    private static void readAndUpdateIon() throws Exception {
        QldbSessionClientBuilder sessionClientBuilder = QldbSessionClient.builder();
        QldbDriver driver = QldbDriver
          .builder()
          .ledger("ion-lab")
          .sessionClientBuilder(sessionClientBuilder)
          .build();

        driver.execute(txn -> {
            Result result = txn.execute("SELECT * FROM Person WHERE PersonId = '123456789'");

            IonStruct personDocument = null;
            Iterator<IonValue> iter = result.iterator();
            while (iter.hasNext()) {
                IonValue obj = iter.next();
                if (obj instanceof IonStruct) {
                    personDocument = (IonStruct) obj;
                    break;
                }
            }

            if (personDocument == null)
                return;

            System.out.println(personDocument.toPrettyString());

            personDocument.put("FirstName").newString("Johnathan");

            IonStruct homeAddress = (IonStruct) personDocument.remove("HomeAddress");
            homeAddress.put("Type").newString("home");

            IonStruct workAddress = (IonStruct) personDocument.remove("WorkAddress");
            workAddress.put("Type").newString("work");

            IonList addresses = personDocument.put("Addresses").newEmptyList();
            addresses.add(homeAddress);
            addresses.add(workAddress);

            txn.execute("UPDATE Person AS p SET p = ? WHERE PersonId = '123456789'", personDocument);
        });
    }


    private static void updateIonForOcc() throws Exception {
        QldbSessionClientBuilder sessionClientBuilder = QldbSessionClient.builder();
        QldbDriver driver = QldbDriver
          .builder()
          .ledger("ion-lab")
          .sessionClientBuilder(sessionClientBuilder)
          .build();

        driver.execute(txn -> {
            Result result = txn.execute("SELECT * FROM Person WHERE PersonId = '123456789'");

            IonStruct personDocument = null;
            Iterator<IonValue> iter = result.iterator();
            while (iter.hasNext()) {
                IonValue obj = iter.next();
                if (obj instanceof IonStruct) {
                    personDocument = (IonStruct) obj;
                    break;
                }
            }

            if (personDocument == null)
                return;

            System.out.println(personDocument.toPrettyString());

            personDocument.put("OCCTestField").newString("Written");

            txn.execute("UPDATE Person AS p SET p = ? WHERE PersonId = '123456789'", personDocument);
        });
    }


    private static void abortUpdate() throws Exception {
        QldbSessionClientBuilder sessionClientBuilder = QldbSessionClient.builder();
        QldbDriver driver = QldbDriver
          .builder()
          .ledger("ion-lab")
          .sessionClientBuilder(sessionClientBuilder)
          .build();

        try
        {
            driver.execute(txn -> {
                Result result = txn.execute("SELECT * FROM Person WHERE PersonId = '123456789'");

                IonStruct personDocument = null;
                Iterator<IonValue> iter = result.iterator();
                while (iter.hasNext()) {
                    IonValue obj = iter.next();
                    if (obj instanceof IonStruct) {
                        personDocument = (IonStruct) obj;
                        break;
                    }
                }

                if (personDocument != null)
                {
                    personDocument.put("YouWillNeverSeeThisField").newString("...OR WILL YOU????");
                    txn.execute("UPDATE Person AS p SET p = ? WHERE PersonId = '123456789'", personDocument);

                    System.out.println("Canceling transaction...");
                    txn.abort();
                    System.out.println("Did I get here?");
                }
            });
        }
        catch (TransactionAbortedException e)
        {
            System.out.println("Our transaction was aborted as expected.");
        }
    }


    private static void deleteDocument() throws Exception {

        QldbSessionClientBuilder sessionClientBuilder = QldbSessionClient.builder();
        QldbDriver driver = QldbDriver
          .builder()
          .ledger("ion-lab")
          .sessionClientBuilder(sessionClientBuilder)
          .build();

        driver.execute(txn -> {
            Result result = txn.execute("DELETE FROM Person WHERE PersonId = '123456789'");

            Iterator<IonValue> iter = result.iterator();
            while (iter.hasNext()) {
                System.out.println(iter.next().toPrettyString());
            }

        });
    }


    private static void readFromJsonTargetedReplacement() throws Exception {
        String jsonInput = "{\"PersonId\":\"987654321\",\"FirstName\":\"Mary\",\"LastName\":\"Smith\",\"MoneyInWallet\":143.39,\"DateOfBirth\":\"1979-10-15\",\"NumberOfLegs\":2,\"LikesGreenBeans\":true,\"ThingsInPocket\":[\"phone\", \"lipstick\"],\"HomeAddress\":{\"Street1\":\"400 N. Broadway\",\"City\":\"Yonkers\",\"State\":\"NY\",\"Zip\":\"10705\"}}";

        IonSystem ionSys = IonSystemBuilder.standard().build();
        IonLoader loader = ionSys.newLoader();
        IonDatagram gram = loader.load(jsonInput);
        IonStruct personDocument = (IonStruct) gram.get(0);

        System.out.println(personDocument.toPrettyString());
        String dobStr = ((IonString) personDocument.get("DateOfBirth")).stringValue();
        String[] parts = dobStr.split("-");

        int year = Integer.parseInt(parts[0]);
        int month = Integer.parseInt(parts[1]);
        int day = Integer.parseInt(parts[2]);

        personDocument.put("DateOfBirth").newTimestamp(Timestamp.forDay(year, month, day));

        System.out.println(personDocument.toPrettyString());

        StringBuilder stringBuilder = new StringBuilder();
        try (IonWriter jsonWriter = IonTextWriterBuilder.json().withPrettyPrinting().build(stringBuilder)) {
            personDocument.writeTo(jsonWriter);
        }
        System.out.println(stringBuilder.toString());
    }


    private static void parseFromJson() throws Exception {
        String jsonInput = "{\"PersonId\":\"987654321\",\"FirstName\":\"Mary\",\"LastName\":\"Smith\",\"MoneyInWallet\":143.39,\"DateOfBirth\":\"1979-10-15\",\"NumberOfLegs\":2,\"LikesGreenBeans\":true,\"ThingsInPocket\":[\"phone\", \"lipstick\"],\"HomeAddress\":{\"Street1\":\"400 N. Broadway\",\"City\":\"Yonkers\",\"State\":\"NY\",\"Zip\":\"10705\"}}";

        IonSystem ionSys = IonSystemBuilder.standard().build();
        ArrayList<IonValue> values = new ArrayList<IonValue>();

        IonReaderBuilder readerBuilder = IonReaderBuilder.standard();
        try (IonReader reader = readerBuilder.build(jsonInput)) {
            while (reader.next() != null) {
                values.add(parseElement(ionSys, reader));
            }
        }

        for (IonValue value: values) {
            System.out.println(value.toPrettyString());
        }
    }


    private static IonValue parseElement(IonSystem ionSys, IonReader reader) throws Exception {

        IonValue value = null;

        switch (reader.getType()) {
            case BOOL:
                value = ionSys.newBool(reader.booleanValue());
                break;
            case DECIMAL:
                value = ionSys.newDecimal(reader.bigDecimalValue());
                break;
            case FLOAT:
                value = ionSys.newFloat(reader.doubleValue());
                break;
            case INT:
                value = ionSys.newInt(reader.intValue());
                break;
            case TIMESTAMP:
                value = ionSys.newTimestamp(reader.timestampValue());
                break;
            case STRING:
                String str = reader.stringValue();
                if (str.matches("^\\d{1,4}-\\d{1,2}-\\d{1,2}$")) {

                    String[] parts = str.split("-");

                    int year = Integer.parseInt(parts[0]);
                    int month = Integer.parseInt(parts[1]);
                    int day = Integer.parseInt(parts[2]);

                    value = ionSys.newTimestamp(Timestamp.forDay(year, month, day));
                } else {
                    value = ionSys.newString(str);
                }
                break;
            case STRUCT:
                reader.stepIn();
                IonStruct struct = ionSys.newEmptyStruct();
                while (reader.next() != null) {
                    struct.put(reader.getFieldName(), parseElement(ionSys, reader));
                }
                value = struct;
                reader.stepOut();
                break;
            case LIST:
                reader.stepIn();
                IonList list = ionSys.newEmptyList();
                while (reader.next() != null) {
                    list.add(parseElement(ionSys, reader));
                }
                value = list;
                reader.stepOut();
                break;
        }

        return value;
    }
}
