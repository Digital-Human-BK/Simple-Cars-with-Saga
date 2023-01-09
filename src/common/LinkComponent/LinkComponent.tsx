import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

type LinkComponentProps = {
  children: string;
  path: string;
  styles: object;
};

function LinkComponent({ children, path, styles }: LinkComponentProps) {
  const navigate = useNavigate();
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      onClick={() => navigate(path)}
      variant="body2"
      underline="hover"
      sx={{ cursor: 'pointer', ...styles }}
    >
      {children}
    </Link>
  );
}

export default LinkComponent;
