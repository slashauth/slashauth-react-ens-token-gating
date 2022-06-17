import { useSlashAuth } from "@slashauth/slashauth-react";
import { useEffect, useState } from "react";

export const LoginStatus = () => {
  const [accessToken, setAccessToken] = useState('');

  const [userHasRole, setUserHasRole] = useState(false);

  const {
    connectedWallet,
    isAuthenticated,
    isLoading,
    hasRole,
    getAccessTokenSilently,
  } = useSlashAuth();

  // A way to instantly detect when the access token changes so we
  // can store it in state to display to the screen.
  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((at: string) => {
        setAccessToken(at);
        hasRole('ENS Token Holder').then((isHasRole: boolean) => {
          setUserHasRole(isHasRole);
        })
      });
    } else {
      setAccessToken('');
      setUserHasRole(false);
    }
  }, [getAccessTokenSilently, hasRole, isAuthenticated]);

  if (isLoading) {
    return (
      <div>
        <span>'Loading...'</span>
      </div>
    );
  }

  return (
    <div>
      <div style={{display: 'block'}}>
        <div>Is Wallet Connected? {connectedWallet ? 'Yes' : 'No'}</div>
        {connectedWallet && <div >Wallet address: {connectedWallet}</div>}
        <div>Is Logged In? {isAuthenticated ? 'Yes' : 'No'}</div>
        {isAuthenticated && <div style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}} onClick={() => {navigator.clipboard.writeText(accessToken)}}>Click to copy access token</div>}
        <div>Has Role? {userHasRole ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
}