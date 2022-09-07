/* eslint-disable no-unused-vars */
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoodIcon from '@material-ui/icons/Mood';
import SendIcon from '@material-ui/icons/Send';
import { Input } from 'components/atoms';
import React, { memo } from 'react';

interface IProps {
  onChange: (val: string) => void;
  onSubmitMessage: () => void;
  messageValue: string;
  isLoading?: boolean;
}

const FooterBody: React.FC<IProps> = ({
  onChange,
  onSubmitMessage,
  messageValue,
  isLoading = false,
}) => {
  return (
    <div className="flex items-center justify-between bg-secondary py-2 px-6 gap-4">
      <div>
        <MoodIcon style={{ fill: '#2C3333' }} />
      </div>
      <div>
        <AttachFileIcon style={{ fill: '#2C3333' }} />
      </div>
      <Input onChange={(e) => onChange(e.target.value)} value={messageValue} />
      <div
        className="cursor-pointer"
        onClick={isLoading ? () => {} : onSubmitMessage}
        data-testid="footer-body-submit"
      >
        <SendIcon style={{ fill: isLoading ? '#F7ECDE' : '#2C3333' }} />
      </div>
    </div>
  );
};

export default memo(FooterBody);
