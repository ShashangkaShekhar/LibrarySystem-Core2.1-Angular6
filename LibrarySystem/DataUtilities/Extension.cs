using System;

namespace DataUtilities
{
    public class Extension
    {
        public static DateTime Today
        {
            get
            {
                DateTime now = DateTime.Now;
                return now.Date;
            }
        }
    }
}
