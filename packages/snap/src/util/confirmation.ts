import { copyable, divider, heading, text, panel } from '@metamask/snaps-ui';
import type { AnyJson } from '@polkadot/types/types';

type ConfirmationDialogContent = {
  prompt: string;
  description?: string;
  sender?: string;
  fee?: string;
  method?: Record<string, AnyJson>;
  textAreaContent?: string;
};

export async function showConfirmationDialog(message: ConfirmationDialogContent): Promise<boolean> {
  return (await snap.request({
    method: 'snap_dialog',
    params: {
      content: panel([
        heading(message.prompt || 'Are you sure?'),
        text(message.description || ''),
        divider(),
        text('Your address:'),
        copyable(message.sender),

        divider(),
        text(`Method: **${JSON.stringify(message.method.method, null, 2)}** `),
        text(JSON.stringify(message.method, null, 2))
      ]),
      type: 'confirmation'
    }
  })) as boolean;
}
