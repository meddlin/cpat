# Styling Options: Why CSS-in-JS?

For the sample project we have opted to use the CSS-in-JS library, [`styled-components`](https://styled-components.com/), to style the project. 

For more info see the library's documentation. [https://styled-components.com/docs](https://styled-components.com/docs)

## Three Competing Solutions

In React applications there are three main types of styling the application. Of course, for each of these options there are also methods of providing SCSS/Less processing for the styles. There isn't an agreed "best practice" for all React applications. 

Knowing some high-level advantages and disadvantages of each strategy can direct your decisions.

- CSS files
- CSS modules
- CSS-in-JS

### CSS Files

> _**When to use:** For very small apps or prototypes. There is little reason to stick with this strategy as soon as it becomes cumbersome._

The main benefit is that it is the most "backwards-compatible" option in the context of moving between web application codebases. The drawback is that our styles are global, by default, while our component-driven application structure is highly counter to this design strategy.

So, it's possible to style the entire app with a single CSS file.

| CSS       |   | App                      |
|-----------|---|--------------------------|
| `App.css` |   | `App.js`                 |
|           |   | `components/`            |
|           |   | `components/Button.js`   |
|           |   | `components/Tab.js`      |
|           |   | `components/SomeForm.js` |


### CSS/SCSS Modules

> _**When to use:** Moving from a large codebase where stylesheets are already utilizing CSS/SCSS. Also, when code re-use across apps/projects is **not** a top priority--this produces tightly coupled .js and .scss files. A medium/large web application needing immediate gains would be a good candidate, or when CSS-in-JS is simply too heavy handed._

When a project is utilizing the CSS Modules pattern the file hierarchy generally starts to take on a structure similar to below.

The benefit here is we have _locally scoped styles for each component!_ This is no small feat as it usually involves some a somewhat involved [webpack](https://webpack.js.org/) configuration. However, using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) we benefit from having that configuration already built-in.

It's possible to double-down on this new advantage by enabling SCSS pre-processing with the `node-sass` package.

node-sass: [https://www.npmjs.com/package/node-sass](https://www.npmjs.com/package/node-sass)

So, you can have some styles local to a component, some styles global (i.e. colors, typography), and can even take advantage of all of the language features Sass/SCSS supports.

| File Structure   |                            |                          |
|------------------|----------------------------|--------------------------|
| `src`            |                            |                          |
|                  |                            | `App.js`                 |
|                  |                            | `App.css`                |
| `src/components` |                            |                          |
|                  | `src/components/button/`   |                          |
|                  |                            | `Button.js`              |
|                  |                            | `Button.module.scss`     |
|                  | `src/components/tab/`      |                          |
|                  |                            | `Tab.js`                 |
|                  |                            | `Tab.module.scss`        |
|                  | `src/components/someform/` |                          |
|                  |                            | `SomeForm.js`            |
|                  |                            | `SomeForm.module.scss`   |

Let's say we wanted to add some styling to a table, and utilize some already broken out SCSS stylesheets.

_**BasicTable.module.scss**_

```scss
@import '../colors.scss';

$some-adjustment: 0.75;

.myTableClass {
    font-family: 'AvenirNext';
    color: $coolBlue; /* imported from colors.scss */

    .specialRow($mult) {
        margin-left: ($some-adjustment * $mult)rem;
    }
}
```

_**BasicTable.js**_

```js
import styles from './BasicTable.module.scss';

const BasicTable = () => {

    return (
        <table className={styles.myTableClass}>
            {/* ...remove for brevity */}
        </table>
    );
};

export default BasicTable;
```

### CSS-in-JS

> _**When to use:** When code re-use is a top priority (i.e. UI/UX frameworks, design systems), and the project will be reused across multiple projects. Also when the consuming project/app needs to provide customization. CSS-in-JS can be used for "normal" web apps to increase maintainability, but make sure the extra complexity leads to enhanced maintainability, not increased **"code noise"**._

This is the most drastic of our options. It's a large shift away from how styles are normally handled, but is more in-line with the paradigm shift that modern JavaScript frameworks bring to component-based, SPA-style web applications.

> Aside from theoretical code structure differences, the main practical advantage CSS-in-JS offers over SCSS modules is that you can opt-in to full JavaScript processing when you need it in your styles--largely, without leaving the CSS/SCSS syntax.

In short, React + JSX enable writing component-based web apps by way of _separation of **concerns**_ instead of _separation of **technology**_. However, JSX only covers HTML an JS. Without any other libraries or configurations, CSS is left to be used by the DOM in the same way it has always been. A CSS-in-JS library, like [styled-components](https://styled-components.com/) brings CSS alongside JSX.

_So, JavaScript, HTML, and CSS all live in the same file. Scary._

Here's an example. Let's say we wanted to create a simple "button" component.

```js
import styled from 'styled-components';

const StyledButton = styled.button`
    color: blue;
    padding: 1.5em;
`;

const Button = (props) => {
    const { titleText, onClickAction } = props;

    return (
        <button onClick={onClickAction}>{titleText}</button>
    );
};

export default Button;
```

As for the file hierarchy, this means individual .css/.scss files are largely no longer part of our project. It's entirely possible to still make use of CSS/SCSS files, but would only be advisable for limited cases of providing some global styling.

| File Structure   |   |                          |
|------------------|---|--------------------------|
| `src`            |   |                          |
|                  |   | `App.js`                 |
|                  |   | `App.css`                |
| `src/components` |   |                          |
|                  |   | `Button.js`              |
|                  |   | `Tab.js`                 |
|                  |   | `SomeForm.js`            |

<hr />

_NOTE: Also! Notice, in the SCSS modules example above we pulled in the module directly from the `.scss` file with a line like this. Meaning all of the styles are contained in their own JavaScript object. So, it's entirely possible to strategically utilize SCSS modules **AND** CSS-in-JS in the same appplication._

```js
import styles from './MyComp.module.scss';
```

<hr />