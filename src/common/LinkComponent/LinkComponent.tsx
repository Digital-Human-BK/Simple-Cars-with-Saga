import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

type LinkComponentProps = {
  children: string;
  path: string;
};

function LinkComponent({ children, path }: LinkComponentProps) {
  const navigate = useNavigate();
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      onClick={() => navigate(path)}
      variant="body2"
      underline="hover"
      sx={{ cursor: 'pointer' }}
    >
      {children}
    </Link>
  );
}

export default LinkComponent;
