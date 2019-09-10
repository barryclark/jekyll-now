---
layout: post
title: MVVM Light and WPF
categories: [WPF, MVVM, Windows, Microsoft, MVVM Light]
datetime: 10-09-2019
author: Ali R.
readingtime: 20m
---

This article focuses on MVVM Light and WPF.

* TOC
{:toc}

# MVVM
MVVM (Model view view-model) is a development standard, derived from MVC model for XAML based software development.



# Why MVVM
With MVVM, we eliminate the need for XAML’s code-behind. The code-behind is hard to maintain, hard to test, tightly coupled and makes our code very complicated. With MVVM, we write code that’s easy to test and also very flexible to change.



# MVVM structure
MVVM contains 3 main modules.

* Model

    This module, contains the models that we’re going to use in our project

* View

    This module, contains the XAML code and their code-behind

* Model-View

    This module, contains the handler and data-binding we’re going to use to control our Views, using our Models.

 

## Data Binding
We call our handling of data and commands, data binding. Since we won’t be using code-behind, we need a way to pass data to our Views, and also handle actions that are received from view (Such as button clicks). With data binding, we can bind an object to our view and make it do the work. With this design, we can later simply test our function by calling it from the test, and it will have nothing to do with the XAML structure. Also, whenever we move a XAML object from one file to another, it can still find the command because it’s not just looking for them in the code-behind.



## Navigation
Using MVVM, causes navigation to become a little bit harder. With code-behind, we simply just created a new instance of the next page’s code-behind and ran it. But here, since the Model-view doesn’t have a context like code-behind, it wouldn’t know how to navigate. So, we need to implement a navigation-service to do our navigation for us.



## Design-time data
With MVVM, we can also have something called design-time data. This will allow us to add some dummy data to our views to make the UI design easier. Say we have a list-view that we want to populate dynamically. Tools such as visual-studio UI design or blend, won’t be able to populate the list-view without running the code.

We use a Boolean value to determine whether we’re in design-time or not. If so, we would use a different Model than we normally would which populates our object with dummy data. That way, when we’re using tools like blend, we will always have the required data and that would make the designer’s job much easier.



Now let’s do some coding…



# MVVM Light for visual studio 2017
For our test project, we’ll be using [MVVM Light](http://www.mvvmlight.net). MVVM Light is a set of tools that will help us implement MVVM model much easier. You can install this suite using visual studio market place.

## Creating the project
In visual studio, go to Create new project… and choose MVVM Light. It will Create the following structure. It has created 4 Folders.

<img src="/images/mvvm-folder-structure.png">

* Design

    This is for our design-time models

* Model

    This is for our normal models

* Skins

    I’m assuming this contains styles

* ViewModel

    This is for our view-models

I’ll also add another folder Views for our XAML files. But later. First, let’s go through the code a little bit.

## App.xaml
App.xaml:
```xml
<Application.Resources>
        <vm:ViewModelLocator x:Key="Locator"
                             d:IsDataSource="True" />
</Application.Resources>
```

The `ViewModelLocator`, is a class defined in `ViewModelLocator.cs` file. This class, is the base class for our view-models. All other view-models must be registered here. (This is the design that mvvm light is using. It’s not defined in the mvvm standard and therefore, you are not obligated to use it.)



## ViewModelLocator.cs

ViewModelLocator.cs:
```c#
static ViewModelLocator()
{
    ServiceLocator.SetLocatorProvider(() => SimpleIoc.Default);
 
    if (ViewModelBase.IsInDesignModeStatic)
    {
        SimpleIoc.Default.Register<IDataService, Design.DesignDataService>();
    }
    else
    {
        SimpleIoc.Default.Register<IDataService, DataService>();
    }
 
    SimpleIoc.Default.Register<MainViewModel>();
}
```

In this class, we have registered a Data Service, and View-model.

As you can see, we’re using `ViewModelBase.IsInDesignModeStatic` to determine if we’re in design mode or not. It we are, we use a different model that has the dummy data.

We have also registered the `MainViewModel` which contains our data bindings for `MainWindow.xaml`.



ViewModelLocator.cs:
```c#
public MainViewModel Main
{
    get
    {
        return ServiceLocator.Current.GetInstance<MainViewModel>();
    }
}
```

# Data Service


To connect to data, we use DataServices. 



DataService.cs:
```c#
public class DataService : IDataService
{
    public void GetData(Action<DataItem, Exception> callback)
    {
        var item = new DataItem("Welcome to MVVM Light");
        callback(item, null);
    }
}
```

It derives from `IDataService` interface and it only contains a `GetData` function to return the only data it has. 



IDataService.cs:
```c#
public interface IDataService
{
    void GetData(Action<DataItem, Exception> callback);
}
```

`DataItem` is just a simple class that contains a property `Title`.



It's also worth taking a look at DesignDataService:



DesignDataService.cs:
```c#
public class DesignDataService : IDataService
{
    public void GetData(Action<DataItem, Exception> callback)
    {
        var item = new DataItem("Welcome to MVVM Light [design]");
        callback(item, null);
    }
}
```

What you see here, is almost exactly what you had with `DataService`, but in a real case scenario, these two would be different. 



# MainViewModel.cs


Last but not least, Let's take a look at our `MainViewModel` class. the View-model for our `MainWindow.xaml`

MainViewModel.cs:
```c#
private string _welcomeTitle = string.Empty;
 
public string WelcomeTitle
{
    get
    {
        return _welcomeTitle;
    }
    set
    {
        Set(ref _welcomeTitle, value);
    }
}
```

The `WelcomTitle` property is the field that will be bound to a xaml object and it's get and set functions will get private field `_welcomeTitle` and set it's data respectively. 



MainViewModel.cs:
```c#
public MainViewModel(IDataService dataService)
{
    _dataService = dataService;
    _dataService.GetData(
        (item, error) =>
        {
            if (error != null)
            {
                return;
            }
 
            WelcomeTitle = item.Title;
        });
}
```

As you can see, the constructor for this class is being called with an `IDataService` parameter (Do a search for Dependency Injection if you don't know how that works). We'll set our `WelcomeTitle` from the data we get from `dataService`. 

MainWindow.xaml
```xml
...
DataContext="{Binding Main, Source={StaticResource Locator}}">
...
<TextBlock FontSize="36"
           FontWeight="Bold"
           Foreground="Purple"
           Text="{Binding WelcomeTitle}"
           VerticalAlignment="Center"
           HorizontalAlignment="Center"
           TextWrapping="Wrap" />
```

The xaml file, sets the `DataContext` to our Main class. Take note, this Main property, is not exactly the class name. It's the field we previously had in the `ViewModelLocator` class which was of the type `MainViewModel`. The `WelcomeTitle` (which is being called by the `TextBlock`) binds to the field in the `MainViewModel` class. 



If you run the project, this is what you'll see:


<img src="/images/welcome-to-mvvm-light.png">




Alright, up to now, we overviewed the project that was given to us by MVVNLight. But now, let's add some stuff ourselves. For this section, i'm going to add login page.



# Login page example
For the login page, we need the following:

* Login xaml page
* Login view-model

    We also need a navigation service to handle our navigation. Let's get to it then:



## Login xaml page
Add a new WPF Window and call it `LoginWindow`

This is the full code of the file:



LoginWindow.xaml:
```xml
<Window x:Class="SampleProject.LoginWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:Converter="clr-namespace:SampleProject.ViewModel"
        mc:Ignorable="d"
        Title="LoginWindow" Height="450" Width="800"
        DataContext="{Binding Login, Source={StaticResource Locator}}">
    <Grid>
        <Grid.Resources>
            <Converter:LoginConverter x:Key="loginConverter" />
        </Grid.Resources>
        <TextBox x:Name="loginInput" HorizontalAlignment="Left" Height="23"
                 Margin="70.838,347.195,0,0" TextWrapping="Wrap" VerticalAlignment="Top"
                 Width="229.827" RenderTransformOrigin="0.5,0.5" BorderThickness="0,0,0,1"
                 BorderBrush="#FFEA0B0B" Text="{Binding InputParams.username}"/>
        <TextBox x:Name="passwordInput" HorizontalAlignment="Left" Height="23"
                 Margin="324.51,347.195,0,0" TextWrapping="Wrap" VerticalAlignment="Top"
                 Width="211.361" BorderThickness="0,0,0,1" BorderBrush="#FFEA0B0B"
                 Text="{Binding InputParams.password}"/>
        <Label x:Name="label" Content="Username:" HorizontalAlignment="Left"
               Margin="70.838,316.165,0,0" VerticalAlignment="Top"/>
        <Label Content="Password:" HorizontalAlignment="Left" Margin="324.51,316.165,0,0"
               VerticalAlignment="Top" />
        <Button x:Name="button" Content="Login" HorizontalAlignment="Left"
                Margin="641.356,350.235,0,0" VerticalAlignment="Top" Width="75"
                RenderTransformOrigin="0.492,0.552" Background="#552F63D1"
                HorizontalContentAlignment="Center" Command="{Binding LoginCommand}">
            <Button.CommandParameter>
                <MultiBinding Converter="{StaticResource loginConverter}">
                    <Binding Path="Text" ElementName="loginInput"/>
                    <Binding Path="Text" ElementName="passwordInput" />
                </MultiBinding>
            </Button.CommandParameter>
        </Button>
    </Grid>
</Window>
```

`DataContext` is bound to the Login field in the `ViewModelLocator` class. Just like what we had with Main. (Add that yourself) Both `textboxes` are bound to a field in the `LoginViewModel` class that i'll show you in a minute. The Button is also bound to a `RelayCommand` field in that class. As you see, we can pass Parameters to the command as form of a `CommandParameter`. Here, since we had 2 parameters, we used a `MultiBinding`. `MultiBinding`, needs a Converter to be able to convert the elements into a class. The Converter is defined a little higher, inside Grid.Resources element. the `LoginConverter` object, is defined in the `LoginViewModel` (Probably should be in a better place)

# Login View-model
Here's the full code for `LoginViewModel` class. Also, we included the `LoginInput` and `LoginConverter` classes in the same file (Because of laziness. don't do that in real projects): 



LoginViewModel.cs:
```c#
namespace SampleProject.ViewModel
{
    public class LoginInput: ObservableObject
    {
        public string username {get; set;}
        public string password { get; set; }
    }
 
    public class LoginViewModel: ViewModelBase
    {
        public RelayCommand<LoginInput> LoginCommand { get; set; }
        public LoginInput InputParams { get; set; }
 
        public LoginViewModel(IDataService dataService)
        {
            InputParams = new LoginInput { username = "", password = "" };
            LoginCommand = new RelayCommand<LoginInput>(login, (LoginInput a) => true);
        }
 
        private void login(LoginInput arg)
        {
            if (arg.username.Equals("admin") && arg.password.Equals("admin"))
            {
                MessageBox.Show("Login succeeded");
            }
            else
            {
                MessageBox.Show("Login failed");
            }
        }
    }
 
    public class LoginConverter : IMultiValueConverter
    {
        public object Convert(object[] values, Type targetType, object parameter, CultureInfo culture)
        {
            return new LoginInput{ username = values[0] as string, password = values[1] as string };
        }
 
        public object[] ConvertBack(object value, Type[] targetTypes, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
```

`LoginCommand` is of type `RelayCommand` that takes `LoginInput` as parameter. `InputParams` is of type `LoginInput`, and the `textboxes` are bound to this object. Defining `RelayCommand`, we need to pass to parameter. The command `funcition` (here: login), and a `CanExecute` function (We simply set that to true for now). Also, the login function, just shows a dialog that says login works. We want to change that so that it would navigate to the `MainWindow` page. 



Please do run the project and test before moving on to the next chapter. Oh also, don't forget to change the default page in the App.xaml file from `MainWindow` to `LoginWindow`. 

# Navigation Service
Now that we have our login page working, let's create a navigation service to be able to navigate from login page, to the Main page. Alright, first off, we have to change some things. We should change `MainWindow` to contain a navigator item and from now on, `MainWindow` won't be a real page of the project. just the container for other pages. So change it this way:



important: Don't forget to keep the previous data and move it to a new page. let's call the new page 'MainPage.xaml' 

MainWindow.xaml:
```xml
<Window x:Class="SampleProject.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:ignore="http://www.galasoft.ch/ignore"
        mc:Ignorable="d ignore"
        Height="450" Width="800"
        Title="MVVM Light Application">
 
    <Frame Name="MainFrame" Source="./LoginWindow.xaml" VerticalAlignment="Stretch" HorizontalAlignment="Stretch"/>
</Window>
```
It only contains a `Frame` component, which as default source, we set the `LoginWindow` page. The Name is also very important (MainFrame). we'll be referencing that in a minute.



Now, let's add the navigation service. First, add an interface:



IBHNavigationService.cs:
```c#
public interface IBHNavigationService : INavigationService
{
    object Parameter { get; set; }
}
```

the `INavigationService` base class is from MVVM Light. 

Now add the class:

BHNavigationService.cs:
```c#
public class BHNavigationService : IBHNavigationService, INotifyPropertyChanged
{
    #region Fields
    private readonly Dictionary<string, Uri> _pagesByKey;
    private readonly List<string> _historic;
    private string _currentPageKey;
    #endregion
    #region Properties            
      
    public string CurrentPageKey
    {
        get
        {
            return _currentPageKey;
        }

        private set
        {
            if (_currentPageKey == value)
            {
                return;
            }

            _currentPageKey = value;
            OnPropertyChanged("CurrentPageKey");
        }
    }
    public object Parameter { get; set; }
    #endregion
    #region Ctors and Methods
    public BHNavigationService()
    {
        _pagesByKey = new Dictionary<string, Uri>();
        _historic = new List<string>();
    }
    public void GoBack()
    {
        if (_historic.Count > 1)
        {
            _historic.RemoveAt(_historic.Count - 1);
            NavigateTo(_historic.Last(), null);
        }
    }
    public void NavigateTo(string pageKey)
    {
        NavigateTo(pageKey, null);
    }

    public virtual void NavigateTo(string pageKey, object parameter)
    {
        lock (_pagesByKey)
        {
            if (!_pagesByKey.ContainsKey(pageKey))
            {
                throw new ArgumentException(string.Format("No such page: {0} ", pageKey), "pageKey");
            }

            Frame frame = GetDescendantFromName(Application.Current.MainWindow, "MainFrame") as Frame;

            if (frame != null)
            {
                frame.Source = _pagesByKey[pageKey];
            }
            Parameter = parameter;
            _historic.Add(pageKey);
            CurrentPageKey = pageKey;
        }
    }

    public void Configure(string key, Uri pageType)
    {
        lock (_pagesByKey)
        {
            if (_pagesByKey.ContainsKey(key))
            {
                _pagesByKey[key] = pageType;
            }
            else
            {
                _pagesByKey.Add(key, pageType);
            }
        }
    }

    private static FrameworkElement GetDescendantFromName(DependencyObject parent, string name)
    {
        var count = VisualTreeHelper.GetChildrenCount(parent);

        if (count < 1)
        {
            return null;
        }

        for (var i = 0; i < count; i++)
        {
            var frameworkElement = VisualTreeHelper.GetChild(parent, i) as FrameworkElement;
            if (frameworkElement != null)
            {
                if (frameworkElement.Name == name)
                {
                    return frameworkElement;
                }

                frameworkElement = GetDescendantFromName(frameworkElement, name);
                if (frameworkElement != null)
                {
                    return frameworkElement;
                }
            }
        }
        return null;
    }

    public event PropertyChangedEventHandler PropertyChanged;

    protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChangedEventHandler handler = PropertyChanged;
        if (handler != null) handler(this, new PropertyChangedEventArgs(propertyName));
    }
    #endregion
}
```

From the top:

`_pagesByKey` is Dictionary of page keys, and their uri address.

`_historic` is to keep the history

`_currentPageKey` is to keep the current loaded page.



the `NavigateTo` function, gets a page key, and a parameter object. It then finds the frame we added to the `MainWindow`, and sets the source to the uri that it gets from the dictionary. `GoBack`, looks up the historic list, and calls `NavigateTo` with what it finds. Configure functions is to populate the dictionary. `GetDescendantFromName` is a helper function for finding the frame. 



This code is taken form this [repo](https://github.com/SamTheDev/SampleMvvmLightNavigation) 



We then need to register the service into the locator.

ViewModelLocator.cs:
```c#
private static void SetupNavigation()
{
    BHNavigationService bHNavigationService = new BHNavigationService();
    bHNavigationService.Configure("Login", new Uri("../LoginWindow.xaml", UriKind.Relative));
    bHNavigationService.Configure("Main", new Uri("../MainPage.xaml", UriKind.Relative));
    SimpleIoc.Default.Register<IBHNavigationService>(() => bHNavigationService);
}
```

Then call this in the constructor.

**Important: notice how we're registering this service. If we instead register this the way we did IDataService, it would create a new instance every time and we had to call Configure in every view-model constructor. **

In the Login view-model, this is how we should change our login function:



LoginViewModel.cs:
```c#
private void login(LoginInput arg)
{
    if (arg.username.Equals("admin") && arg.password.Equals("admin"))
    {
        _navigationService.NavigateTo("Main");
    }
    else
    {
        MessageBox.Show("Login failed");
    }
}
```

And that's it. now if you run the project, it should startup with the login page. then if you enter "admin" "admin", it should navigate to the Main page. 

# Messaging
Now, we're going to do some messaging between view-models. For this, i'm going to add a side menu pane to the main page, and have the main page's message, change as we click on each menu item. Just as simple as: 

<img src="/images/mvvm-messaging.png">

So default would be "Main Page" and we'll simply change that with the menu item. the easiest thing ever. But first, let's create the views. Change the MainPage.xaml as follows:

MainPage.xaml:
```xml
<Page
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
      xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
      xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
      xmlns:local="clr-namespace:SampleProject"
      xmlns:i="http://schemas.microsoft.com/expression/2010/interactivity" x:Class="SampleProject.MainPage"
      mc:Ignorable="d"
      Height="450" Width="800"
      ShowsNavigationUI="False"
      Title="MainPage">
 
    <Page.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ResourceDictionary Source="Skins/MainSkin.xaml" />
            </ResourceDictionary.MergedDictionaries>
            <DataTemplate x:Key="menuListItemTemplate">
                <Label Content="{Binding title}" Foreground="Black" VerticalAlignment="Center">
                </Label>
            </DataTemplate>
        </ResourceDictionary>
    </Page.Resources>
 
    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="100"/>
            <ColumnDefinition />
        </Grid.ColumnDefinitions>
         
        <Grid x:Name="LayoutRoot" Grid.Column="1"
          DataContext="{Binding Main, Source={StaticResource Locator}}" >
 
            <TextBlock FontSize="36"
                   FontWeight="Bold"
                   Foreground="Purple"
                   Text="{Binding WelcomeTitle}"
                   VerticalAlignment="Center"
                   HorizontalAlignment="Center"
                   TextWrapping="Wrap" />
        </Grid>
         
        <DockPanel Grid.Column="0" DataContext="{Binding SideMenu, Source={StaticResource Locator}}">
            <ListBox
                x:Name="MFListbox"
                ItemsSource="{Binding ListBoxItems}"
                     ItemTemplate="{StaticResource menuListItemTemplate}"
                     >
                <i:Interaction.Triggers>
                    <i:EventTrigger EventName="SelectionChanged">
                        <i:InvokeCommandAction Command="{Binding menuItemChanged}"
                                               CommandParameter="{Binding ElementName=MFListbox, Path=SelectedItem}"/>
                    </i:EventTrigger>
                </i:Interaction.Triggers>
            </ListBox>
        </DockPanel>
 
         
    </Grid>
</Page>
```

We've added another Grid element to be the father of all elements, and a DockPanel for the side panel. The dockpanel contains a ListBox of menu items. The ListboxItem template is defined a little higher in the same file. It's a simple TextBlock element. Also we've added a SelectionChanged trigger to handle the clicks on menu items. It will call the command handler that's defined in a view-model i'll tell you about in a minute, and passes the ListBox's SelectedItem property as CommandParameter. 



SideMenuViewModel.cs:
```c#
namespace SampleProject.ViewModel
{
    public class MenuItem
    {
        public string title { get; set; }
    }
    public class SideMenuViewModel : ViewModelBase
    {
        public List<MenuItem> ListBoxItems { get; set; }
        public RelayCommand<MenuItem> menuItemChanged { get; set; }
        public MenuItem SelectedItem { get; set; }
 
        public SideMenuViewModel(IDataService dataService, IBHNavigationService bHNavigation)
        {
            menuItemChanged = new RelayCommand<MenuItem>(changed, (MenuItem e) => true);
            ListBoxItems = new List<MenuItem>();
            ListBoxItems.Add(new MenuItem { title = "Main Page" });
            ListBoxItems.Add(new MenuItem { title = "Profile" });
            ListBoxItems.Add(new MenuItem { title = "Settings" });
            Messenger.Default.Send("Main Page");
        }
 
        private void changed(MenuItem e)
        {
            Messenger.Default.Send(e.title);
        }
    }
}
```

We have a simple MenuItem class which is pretty straight forward. The rest is just as we already had. just simple Data binding. the new thing here, is the Messenger component to send the message. The message is just the name of the item. And it will be broadcasted to any class who has registered. Registering is also just as simple as this:

MainViewModel.cs:
```c#
public MainViewModel(IDataService dataService, IBHNavigationService bHNavigation)
{
    GeneralWelcome = "";
    Messenger.Default.Register<string>(this, message =>
    {
        WelcomeTitle = GeneralWelcome + " " + message;
    });
    _dataService = dataService;
    _dataService.GetData(
        (item, error) =>
        {
            if (error != null)
            {
                return;
            }
 
            WelcomeTitle = item.Title;
            GeneralWelcome = item.Title;
        });
}
```
As you can see, we call "Register" function, and we pass in the current context, and a method to handle the message arrival. We simply append it to our message. And that's it. If you run the program (and login), you can see how changing the items will change the message. 



Don't forget to register the view-model


# Summary
In this article, we started by giving a small introduction on MVVM and the reason we use it. Then we wrote a small application using MVVM Light for visual studio 2019 on WPF. We discussed data bindings and commands. We added a login page which would compare input against a hard-coded credentials. Then we added navigation service to navigate to main page on login success. 

I really hope i haven't forgotten anything. But if in any case, you run into some problems, please take a look at the full code on 

[github](https://github.com/ipinlnd/MVVMTest)

