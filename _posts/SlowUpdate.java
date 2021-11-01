package lab2;

import com.amazon.ion.*;
import com.amazon.ion.system.*;
import com.amazon.ion.util.*;

import software.amazon.awssdk.services.qldbsession.*;
import software.amazon.awssdk.services.qldbsession.model.OccConflictException;
import software.amazon.qldb.*;
import software.amazon.qldb.exceptions.TransactionAbortedException;

import java.util.Iterator;


public class SlowUpdate {
    public static void main(String[] args) throws Exception {
        QldbSessionClientBuilder sessionClientBuilder = QldbSessionClient.builder();

        //RetryPolicy retryPolicy = RetryPolicy.builder().maxRetries(3).build();
        RetryPolicy retryPolicy = RetryPolicy.none();

        QldbDriver driver = QldbDriver
          .builder()
          .ledger("ion-lab")
          .sessionClientBuilder(sessionClientBuilder)
          .transactionRetryPolicy(retryPolicy)
          .build();

        try {
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

                personDocument.put("SlowUpdateWuzHere").newString("The Slow Update committed!");
                txn.execute("UPDATE Person AS p SET p = ? WHERE PersonId = '123456789'", personDocument);


                try {
                    System.out.println("Sleeping...");
                    Thread.sleep(20 * 1000);
                } catch(Exception e) {
                }

            });
        } catch (OccConflictException e) {
            System.out.println("OCC conflict occurred!");
        }
    }
}
