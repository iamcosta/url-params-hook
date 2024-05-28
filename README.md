# `url-params-hook`

> What about map an object to url search parameters? :)

## Installation

```bash
npm install @iamcosta/url-params-hook
# or
yarn add @iamcosta/url-params-hook
```

## Usage

```ts
import { useUrlParams } from  "@iamcosta/url-params-hook";

// ...
type YourType = {
    someProp: string;
    anotherProp: number;
}
const { values, onChange } = useUrlParams<YourType>();

// ...

// This change url parameters...
onChange({
    someProp: "some text",
    // ...
});

// ... while this obtains the new value provided by url state in any place
const { someProp } = values;
```

## License

MIT @ Iam Barroso da Costa
