import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { Modal } from 'components/atoms';

interface IProps {
  isOpen?: boolean;
  isError?: boolean;
  onClose?: () => void;
  message: string;
}

const ModalStatus: React.FC<IProps> = ({
  isOpen = true,
  isError = true,
  onClose,
  message,
}) => {
  const color = isError ? 'text-red-500' : 'text-secondary';
  const colorRgb = isError ? 'rgb(239 68 68)' : 'rgb(158 210 198)';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-1/3 h-1/6 rounded-2xl flex flex-col overflow-hidden bg-white justify-center"
      >
        <div className="flex items-center px-5">
          <div>
            {isError ? (
              <ErrorIcon style={{ fontSize: 54, fill: colorRgb }} />
            ) : (
              <CheckCircleIcon style={{ fontSize: 54, fill: colorRgb }} />
            )}
          </div>
          <p className={`text-3xl ml-4 font-bold ${color}`}>{message}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalStatus;
