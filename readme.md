# Alfred-xlargetype

* Example usage xlargetype:

![example-workflow01.png](assets/example-workflow01.png)

![example-workflow02.png](assets/example-workflow02.png)

![example-workflow03.png](assets/example-workflow03.png)


```
query=`cat /Users/${USER}/Documents/laptop-config/shortcuts/shortcuts.html`
echo "$query"

/Applications/xlargtype.app/Contents/MacOS/xlargtype --html $query --bgcolor "#10A383"
```