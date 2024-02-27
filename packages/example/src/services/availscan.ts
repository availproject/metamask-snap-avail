export function getAvailscanTxUrl(txHash: string, network: string): string {
  switch (network) {
    case 'avail':
      return `https://goldberg.avail.tools/#/explorer/${txHash}`;
    default:
      return '';
  }
}
