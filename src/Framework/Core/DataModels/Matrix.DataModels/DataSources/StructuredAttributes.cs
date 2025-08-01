namespace Matrix.Matrix.DataModels.DataSources;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class StructuredAttributes : DataSourceAttributes
{
    public required String Host { get; set; }
    public required Int32 Port { get; set; }
    public required String DatabaseName { get; set; }
    public String? Schema { get; set; }
    public List<String> TableList { get; set; } = new();
    public String? QueryTemplate { get; set; }
}
