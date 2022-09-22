import { HTMLProps } from 'react';

interface IProps extends HTMLProps<HTMLHeadingElement> {}

const Text: React.FC<IProps> = (props) => {
  return <p className="text-base">{props.children}</p>;
};

const H1: React.FC<IProps> = (props) => {
  return (
    <h1 className="font-black text-4xl" {...props}>
      {props.children}
    </h1>
  );
};

const H2: React.FC<IProps> = (props) => {
  return (
    <h2 className="font-black text-3xl" {...props}>
      {props.children}
    </h2>
  );
};

const H3: React.FC<IProps> = (props) => {
  return (
    <h3 className="font-bold text-2xl" {...props}>
      {props.children}
    </h3>
  );
};

const H4: React.FC<IProps> = (props) => {
  return (
    <h4 className="font-bold text-xl" {...props}>
      {props.children}
    </h4>
  );
};

const H5: React.FC<IProps> = (props) => {
  return (
    <h5 className="font-bold text-lg" {...props}>
      {props.children}
    </h5>
  );
};

const body1: React.FC<IProps> = (props) => {
  return (
    <p className="text-sm" {...props}>
      {props.children}
    </p>
  );
};

const body2: React.FC<IProps> = (props) => {
  return (
    <p {...props} className={`text-xs ${props.className}`}>
      {props.children}
    </p>
  );
};

export default Object.assign(Text, { H1, H2, H3, H4, H5, body1, body2 });
