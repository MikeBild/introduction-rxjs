<Query Kind="Program">
  <Connection>
    <ID>394b9671-fac7-48e4-94ec-6e7871897fc1</ID>
    <Persist>true</Persist>
    <Driver Assembly="RavenLinqpadDriver" PublicKeyToken="585b2b0c3c4c2d89">RavenLinqpadDriver.RavenDriver</Driver>
    <CustomAssemblyPathEncoded>&lt;CommonApplicationData&gt;\LINQPad\Drivers\DataContext\4.0\RavenLinqpadDriver (585b2b0c3c4c2d89)\RavenLinqpadDriver.dll</CustomAssemblyPathEncoded>
    <CustomAssemblyPath>C:\ProgramData\LINQPad\Drivers\DataContext\4.0\RavenLinqpadDriver (585b2b0c3c4c2d89)\RavenLinqpadDriver.dll</CustomAssemblyPath>
    <CustomTypeName>RavenLinqpadDriver.RavenContext</CustomTypeName>
    <DriverData>
      <RavenConnectionInfo>{"Name":"SerFinda Data","Url":"https://1.ravenhq.com/databases/AppHarbor_268bfa56-00c6-4b89-ae2c-2003c8459657","DefaultDatabase":null,"ApiKey":"aacff304-4359-4f84-a1a1-01663184ed87","ResourceManagerId":null,"Username":null,"Password":null,"AssemblyPaths":"C:\\Users\\mike.bild\\Documents\\Projects\\ServiceRecommendation\\webprocessor\\model\\bin\\Debug\\model_contract.dll","Namespaces":"model_contract","IsInDesignMode":false}</RavenConnectionInfo>
    </DriverData>
  </Connection>
  <Reference>&lt;RuntimeDirectory&gt;\WPF\PresentationCore.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\WPF\PresentationFramework.dll</Reference>
  <Reference Relative="cslibs\System.Reactive.dll">C:\Users\mike.bild\Desktop\Rx101Js\csshim\cslibs\System.Reactive.dll</Reference>
  <Reference Relative="cslibs\System.Reactive.Windows.Threading.dll">C:\Users\mike.bild\Desktop\Rx101Js\csshim\cslibs\System.Reactive.Windows.Threading.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\System.Xaml.dll</Reference>
  <Reference>&lt;RuntimeDirectory&gt;\WPF\WindowsBase.dll</Reference>
  <Namespace>System</Namespace>
  <Namespace>System.Windows</Namespace>
  <Namespace>System.Windows.Controls</Namespace>
  <Namespace>System.Linq</Namespace>
  <Namespace>System.Reactive.Linq</Namespace>
  <Namespace>System.Reactive</Namespace>
  <Namespace>System.Reactive.Concurrency</Namespace>
</Query>

void Main() { var window = new Window1(); window.Show(); }

class Window1 : Window
{
	IDisposable clickButtonSubscribtion;
	public Window1()
	{
		var button = new Button {Content = "Click me, baby, one more time!", Width = 200, Height = 25};
		AddChild(button);
		//button.Click += (s,e) => MessageBox.Show("Yeah - done!", "Nice!");
		
		clickButtonSubscribtion = Observable
		.FromEventPattern<RoutedEventArgs>(button, "Click")
		.Subscribe(x=> 
		{ 
			MessageBox.Show("Yeah - done!", "Nice!"); 
			clickButtonSubscribtion.Dispose(); 
		});
		
		
	}

	void button_Click(object sender, RoutedEventArgs e)	{}
}