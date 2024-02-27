import { TransactionsList } from 'components/ui/molecule/TransactionsList';
import { Header } from 'components/ui/organism/Header';
import { useAppSelector } from 'hooks/redux';
import { RightPart, Wrapper, NoTransactions } from './Home.style';

interface Props {
  address: string;
}

export const HomeView = ({ address }: Props) => {
  const loader = useAppSelector((state) => state.UI.loader);
  const wallet = useAppSelector((state) => state.wallet);

  return (
    <Wrapper>
      <RightPart>
        {wallet.accounts.length > 0 && <Header address={address} />}
        <TransactionsList transactions={wallet.transactions || []} />
        {Object.keys(wallet.transactions).length === 0 && !loader.isLoading && (
          <NoTransactions> You have no transactions</NoTransactions>
        )}
      </RightPart>
    </Wrapper>
  );
};
