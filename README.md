# anitype
Animated javascript typing 

Basic animated typing thats easy to deploy.


## Import via CDN

Add this tag to the head of your html file.

```html

<script src="https://cdn.jsdelivr.net/gh/lewis-morris/anitype@main/anitype.js" defer></script>

````


## Set elements to animate 

    * Add `data-typer` attribute to any element to animate it. 
    * Split the innerText with pipes ( | )  to animate multiple lines.
    * Alternatively you can set the text with `data-text="my animated text|just wont stop typing"` 

## Example HTML


```html
<html>
    <head>
        <script src="https://cdn.jsdelivr.net/gh/lewis-morris/anitype@main/anitype.js" defer></script>
        
    </head>
    <body style="text-align: center;">
        <h2 data-typer data-text="I can animate|I make mistakes|We're not all perfect"></h2>
    </body>
</html>

````

## Support or Contact

Open a issue or contact me on lewis.morris@gmail.com
