/*
  **********************************************************************
  * cbiface by GreyGnome aka Mike Schwager                             *
  * version 1.1 Sun Mar 11 14:25:08 CDT 2012                           *
  * Based on version 1.0 of cb library, this is the first implementa-  *
  * tion of cbifoce.                                                   *
  *                                                                    *
  * Updates since version 1.0 of cb.h:                                 *
  * Renamed this little library, to cbiface (from cb) because:         *
  * Got rid of the CallBack class.  My interrupt library can call the  *
  * cbmethod() of any object that subclasses the CallBackInterface     *
  * class (...Java style! :-)  ).  The CallBack class is not necessary *
  * for these purposes.                                                *
  *                                                                    *
  * based on:                                                          *
  *      Variable Parameter Call-Back Template (version 0.0.1)         *
  *                                                                    *
  * Author: Arash Partow - 2000                                        *
  * URL: http://www.partow.net/programming/templatecallback/index.html *
  *                                                                    *
  * Copyright Notice:                                                  *
  * Free use of this library is permitted under the guidelines and     *
  * in accordance with the most current version of the Common Public   *
  * License.                                                           *
  * http://www.opensource.org/licenses/cpl.php                         *
  *                                                                    *
  **********************************************************************
*/


#ifndef INCLUDE_CBIFACE_H
#define INCLUDE_CBIFACE_H

class CallBackInterface
{
   public:

     CallBackInterface() {};

     virtual void cbmethod() {
     };

};

#endif
