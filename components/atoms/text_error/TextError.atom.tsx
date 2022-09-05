import ErrorIcon from '@material-ui/icons/Error';

interface IProps {
  errorMessage: string;
}

const TextError: React.FC<IProps> = ({ errorMessage }) => {
  return (
    <div className="flex items-center absolute mt-1">
      <ErrorIcon
        style={{ fill: 'rgb(239 68 68)', fontSize: 14, marginRight: 4 }}
      />
      <p className="text-red-500 text-xs">{errorMessage}</p>
    </div>
  );
};

export default TextError;
