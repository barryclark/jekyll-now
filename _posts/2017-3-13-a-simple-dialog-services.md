---
layout: post
title: Простой диалоговоый сервис
comments: true
---
![My helpful screenshot]({{ site.url }}/images/p2-1.png)

Я был сильно удивлен, когда узнал что при создании  WPF-проекта нужно будет создавать свой диалоговый сервис. Разработчику доступны диалоги только с основным функционалом: открыть, сохранить и т.д.
Так для чего он вообще нужен-то? Он нужен для отображения модальных окон, отличающихся от стандартных.
Для того, чтобы показать как можно сделать простой диалоговый сервис я создам простое WPF-приложения.

![My helpful screenshot]({{ site.url }}/images/p2-2.png)

Добавим в решение ещё один проект «Библиотеку классов».

![My helpful screenshot]({{ site.url }}/images/p2-3.png)

Приступаем к написанию сервиса. Для начало создадим интерфейс в проекте DialogService, который будет является супер типом для ViewModel’ей. Он будет пустой. Я его назову IViewModelModal.
Затем я создаю интерфейс, который будет представлять диалоговый сервис.
```
namespace DialogService
{
    interface IDialog
    {
        void ShowModal(IViewModel viewModel, Window window);
    }
}
```
Далее нужно реализовать его, для этого я создам класс, который назову Dialog.
```
namespace DialogService
{
    public class Dialog : IDialog
    {
        public void ShowModal(IViewModelModal viewModel, Window window)
        {
            var vm = viewModel;
            var win = window;
            win.ShowInTaskbar = false;
            win.Height = window.Height;
            win.Width = window.Width;
            win.WindowsStyle = WindowStyle.ToolWindow;
            win.DataContext = vm;
            win.ShowDialog();
        }
    }
}
```
Ну всё. Теперь можно пойти и выпить чаю потому, что диалоговый сервис готов.
Осталось дело за малым, показать как он работает. Для этого на главное окно добавим кнопку, которая и будет вызывать диалоговое окно.
Так как диалоговый сервис предполагает использования паттерна MVVM то логичней было бы сделать привязку команды в ViewModel. Для этого создаем простой класс Command, который реализует ICommand.
```
public Class Command : ICommand
{
    readonly Action<object> _execute;

    public Command(Action<objet> execute)
    {
        _execute = execute;
    }

    public bool CanExecute(object parameter)
    {
        return true;
    }

    public void Execute(object parameter)
    {
        _execute(parameter);
    }

    public event EventHandler CanExecuteChanged
    {
        add {CommandManager.RequerySuggested += value;}
        remove {CommandManager.RequerySuggested -= value;}
    }
}
```
Далее нужно реализовать окно для диалога. Оно представляет из себя обычное окно, которое содержит TextBox по середине.  Для этого создаем ModalViewModel, которая содержит одно текстовое свойства.
Далее реализовываем MainViewModel. Данный класс будет содержать целую одну командищу.

```
public class MainViewModel
{
    private void ShowDialog(object obj)
    {
        var dialogService = new Dialog();
        dialogService.ShowModal(new Dialog(), new ModalViewModel());
    }

    public ICommand ShowDialogCommand
    {
        get
        {
            return new Command(ShowDialog);
        }
    }
}
```
После чего запускаем наш проект и смотрим, что же получилось.

![My helpful screenshot]({{ site.url }}/images/p2-4.png)