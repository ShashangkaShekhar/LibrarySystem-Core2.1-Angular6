using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;

namespace DataUtilities
{
    public class Logs
    {
        public static string path = CurrentAssemblyDirectory().ToString();
        public static string assemblyFile = path.Remove(path.IndexOf("\\bin\\Debug")).ToString();
        private const string FILE_NAME = "systemLog\\LogTextFile.txt";

        private static string ConfigFilePath
        {
            get { return assemblyFile + "\\" + FILE_NAME; }
        }

        public static void WriteLogFile(string message)
        {
            FileStream fs = null;
            if (!File.Exists(ConfigFilePath))
            {
                using (fs = File.Create(ConfigFilePath))
                {
                }
            }

            try
            {
                if (!string.IsNullOrEmpty(message))
                {
                    StreamWriter streamWriter = new StreamWriter(ConfigFilePath, true);
                    streamWriter.WriteLine(message);
                    streamWriter.Close();
                }
            }
            catch
            {

            }
        }

        static public string CurrentAssemblyDirectory()
        {
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            return Path.GetDirectoryName(path);
        }
    }
}
