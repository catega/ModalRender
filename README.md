# ModalRender
React component using [ant design Modal](https://ant.design/components/modal) as a base.

## Basic Example
This is the minimum you need to make it work.
```js
    <ModalRender 
        objModal= {{
            title: 'Example Modal',
            content: <MyComponent />
        }}
        trigger={<Button text='Open Modal' />}
    />
```

## Modal with dependencies
If you have to pass some states as a prop to the Modal for them to change inside, you have to add the states to the `dependencies` to see the changes.

>Note that the dependencies prop is an object.
```js
    const [ person, setPerson ] = useState({
        name: '',
        age: 27
    });
    const [ numbers, setNumbers ] = useState([1, 2, 3, 4]);

    <ModalRender 
        objModal={{
            title: 'Example Modal with dependencies',
            content: <MyComponent myPerson={person} numbers={numbers} />
        }}
        trigger={<Button text='Open Modal' />}
        dependencies={{person, numbers}}
    />
```

## Trigger without click
You can trigger the Modal without clicking any component. To do this you have to set a useState and pass it to the `openModal` prop.

If you don't want a `trigger` component, set it as null.
```js
    const [ triggerModal, setTriggerModal ] = useState(false);

    const myFunction = () => {
        ...some magic
        setTriggerModal(true);
    }

    <ModalRender 
        objModal={{
            title: 'Example Modal without click',
            content: <MyComponent />
        }}
        openModal={triggerModal}
        trigger={null}
    />
```

## Closing the Modal
The `ModalRender` component passes a function named `closeModal` as a prop to the `content` component when it is created.

To use it you just have to recieve it in the props and use it as a function.

```js
    const MyComponent = ({
        closeModal
        ...props,
    }) => {

        return <div>
            <h1>Title</h1>
            <p>Text inside the modal</p>

            <div className='floatRight'>
                <Button text='Close' onClick={closeModal} />
                <Button text='OK' onClick={() => {
                    ...magic
                    closeModal();
                }}>
            </div>
        </div>
    }
```