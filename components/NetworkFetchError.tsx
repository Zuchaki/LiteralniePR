import { faSignal, faSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { FC } from 'react';

import Button from './Button';
import Text from './Text';

type Props = {
  onRefetch: () => void;
  className?: string;
};
const NetworkFetchError: FC<Props> = ({ onRefetch, className }) => {
  return (
    <div
      className={classNames(
        'flex items-center justify-center flex-col gap-5',
        className,
      )}
    >
      <div className="flex flex-row gap-2">
        <Text variant="lg">Błąd połączenia</Text>
        <div className="relative">
          <FontAwesomeIcon icon={faSlash} />
          <FontAwesomeIcon
            icon={faSignal}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      <Button onClick={onRefetch}>Spróbuj załadować ponownie</Button>
    </div>
  );
};

export default NetworkFetchError;
