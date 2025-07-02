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
  console.log('=== CONFIRMATION DIALOG START ===');
  console.log('Dialog content:', message);
  
  const content = [];

  // Add the main prompt
  content.push(heading(message.prompt || 'Are you sure?'));
  
  // Add description if provided
  if (message.description) {
    content.push(text(message.description));
  }

  // Add transaction-specific content only if method is provided
  if (message.method) {
    content.push(divider());
    if (message.sender) {
      content.push(text('Your address:'));
      content.push(copyable(message.sender));
    }
    content.push(divider());
    content.push(text(`Method: **${JSON.stringify(message.method.method, null, 2)}** `));
    content.push(text(JSON.stringify(message.method, null, 2)));
  }

  console.log('Requesting dialog from snap...');
  const result = await snap.request({
    method: 'snap_dialog',
    params: {
      content: panel(content),
      type: 'confirmation'
    }
  }) as boolean;
  
  console.log('Dialog result:', result);
  console.log('=== CONFIRMATION DIALOG END ===');
  
  return result;
}
