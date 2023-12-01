# Alfred-xlargetype

* Note After installing this app, the first time it takes about ~10sec to install the depencies...

# Example usage xlargetype:

![example-workflow01.png](assets/example-workflow01.png)

![example-workflow02.png](assets/example-workflow02.png)

![example-workflow03.png](assets/example-workflow03.png)

# bash script:

```
query=`cat /Users/${USER}/Documents/laptop-config/shortcuts/shortcuts.html`
echo "$query"

/Applications/xlargtype.app/Contents/MacOS/xlargtype --html $query --bgcolor "#10A383"

#or

/Applications/xlargtype.app/Contents/MacOS/xlargtype --file /Users/${USER}/Documents/laptop-config/shortcuts/shortcuts.html --bgcolor "#10A383"

```

# Example use case:
![example-usecase.gif](assets/example-usecase.gif)


# xlargetype options

```
/Applications/xlargtype.app/Contents/MacOS/xlargtype --help

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --file     Specify a file path                                        [string]
  --html     Specify HTML content                                       [string]
  --bgcolor  Specify background color                                   [string]
  --color    Specify text color                                         [string]
  --thcolor  Specify th background color                                [string]
  --size     Specify window size                        [number] [default: 0.85]
```

# xlargetype can also be included in a Alfred Workflow 

just put it in the workflow folder and use it like so:

```
./xlargtype.app/Contents/MacOS/xlargtype --file "/Users/marcotten/Documents/laptop-config/shortcuts/shortcuts.html" --bgcolor "#10A383" --thcolor "0d846a" --color "#fff"
```

