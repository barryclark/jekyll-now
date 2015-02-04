---
layout: post
title: Rubymotion about android adapter usage
---
 
rubymotion关于adapter的用法（该文为转载）

### ArrayAdapter使用
main_activity.rb


```
class MainActivity < Android::App::Activity
  Members = ['Kanako', 'Ayaka', 'Shiori', 'Momoka', 'Reni']
  def onCreate(savedInstanceState)
    super
    list = Android::Widget::ListView.new(self)
    list.adapter = HelloArrayAdapter.new(self, Android::R::Layout::Simple_list_item_1, Members)
    layout = Android::Widget::LinearLayout.new(self)
    layout.addView(list, Android::Widget::LinearLayout::LayoutParams.new(Android::View::ViewGroup::LayoutParams::MATCH_PARENT, Android::View::ViewGroup::LayoutParams::WRAP_CONTENT))
    self.contentView = layout
  end
end
```

hello_array_adapter.rb


```
class HelloArrayAdapter < Android::Widget::ArrayAdapter
  def getView(position, convertView, parent)
    textView = Android::Widget::TextView.new(context)
    textView.text = self.getItem(position)
    layout = Android::Widget::LinearLayout.new(context)
    layout.addView(textView, Android::Widget::LinearLayout::LayoutParams.new(Android::View::ViewGroup::LayoutParams::MATCH_PARENT, Android::View::ViewGroup::LayoutParams::WRAP_CONTENT))
    layout
  end
end
```

### BaseAdapter使用
main_activity.rb


```
class MainActivity < Android::App::Activity
  def onCreate(savedInstanceState)
    super
    listView = Android::Widget::ListView.new(self)
    listView.adapter = HelloListAdapter.new
    listView.onItemClickListener = self
    listView.choiceMode = Android::Widget::AbsListView::CHOICE_MODE_SINGLE
    textView = Android::Widget::TextView.new(self)
    textView.text = "Momoiro Clover Z"
    layout = Android::Widget::LinearLayout.new(self)
    layout.orientation = Android::Widget::LinearLayout::VERTICAL
    layout.addView(textView, Android::Widget::LinearLayout::LayoutParams.new(Android::View::ViewGroup::LayoutParams::MATCH_PARENT, Android::View::ViewGroup::LayoutParams::WRAP_CONTENT))
    layout.addView(listView, Android::Widget::LinearLayout::LayoutParams.new(Android::View::ViewGroup::LayoutParams::MATCH_PARENT, Android::View::ViewGroup::LayoutParams::WRAP_CONTENT))
    self.contentView = layout    
  end
  def onItemClick(parent, view, position, id)
    p position
  end
end
```


hello\_list\_adapter.rb


```
class HelloListAdapter < Android::Widget::BaseAdapter 
  Data = ["Kanako", "Aayaka", "Shiori", "Momoka", "Reni"]
  def getCount()
    Data.size
  end
  def getItem(position)
    Data[position]
  end
  def getItemId(position)
    position
  end
  def getView(position, convertView, parent)
    context = parent.context
    if convertView.nil?
      textView1 = Android::Widget::TextView.new(context)
      textView1.text = (position + 1).to_s
      textView2 = Android::Widget::TextView.new(context)
      textView2.text = getItem(position)
      layout = Android::Widget::LinearLayout.new(context)
      layout.orientation = Android::Widget::LinearLayout::HORIZONTAL
      layout.addView(textView1,  Android::Widget::LinearLayout::LayoutParams.new(Android::View::ViewGroup::LayoutParams::WRAP_CONTENT, Android::View::ViewGroup::LayoutParams::WRAP_CONTENT))
      layout.addView(textView2,  Android::Widget::LinearLayout::LayoutParams.new(Android::View::ViewGroup::LayoutParams::MATCH_PARENT, Android::View::ViewGroup::LayoutParams::WRAP_CONTENT))
      layout
    else
      convertView
    end
  end
end
```

原文链接地址：http://qiita.com/sassy_watson/items/53fb87d4814708c87760
