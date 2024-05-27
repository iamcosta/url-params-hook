# `@iamcosta/url-params-hook`

> What about map an object to url search parameters? :)

## Installation

```bash
npm install @iamcosta/url-params-hook
```

## Usage

```ts
import { useUrlParams } from '@iamcosta/url-params-hook';

// ...
type YourType = {
    someProp: string;
    anotherProp: number;
}
const { params, onChange } = useUrlParams<YourType>();

// ...

// This change url parameters...
onChange({
    someProp: "some text",
    // ...
});

// ... while this obtains the new value provided by url state in any place
const { someProp } = params;
```

## License

MIT @ Iam Barroso da Costa
