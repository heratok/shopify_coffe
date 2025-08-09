import { Injectable } from '@angular/core';
import { loadScript, type PayPalNamespace, type PayPalButtonsComponentOptions } from '@paypal/paypal-js';

/**
 * PayPal integration service using @paypal/paypal-js.
 * - Lazily loads the SDK (sandbox by default) with USD currency.
 * - Exposes a helper to render Buttons with a dynamic amount.
 * - Centralizes error handling and provides strong typing.
 *
 * Switch to production: pass your live client ID to init() or renderButtons().
 */
@Injectable({ providedIn: 'root' })
export class PaypalService {
  private static readonly DEFAULT_CLIENT_ID_SANDBOX =
    'AecoH0ce2Hv82yAd2MAcPfem5sZgQQ0V193HROKJQlgMBVCHYiItohKCmNZ48Eob45DPMsnkc984uox7';

  private paypalPromise?: Promise<PayPalNamespace | null>;

  /**
   * Loads PayPal SDK if needed and returns the namespace.
   * @param clientId PayPal Client ID (sandbox or live)
   * @param currency Currency code (default USD)
   */
  async init(clientId?: string, currency: string = 'USD'): Promise<PayPalNamespace> {
    try {
      if (!this.paypalPromise) {
  this.paypalPromise = loadScript({
          clientId: clientId || PaypalService.DEFAULT_CLIENT_ID_SANDBOX,
          currency,
          intent: 'capture',
          components: 'buttons'
        });
      }
      const paypal = await this.paypalPromise;
      if (!paypal) throw new Error('PayPal SDK failed to load');
      return paypal;
    } catch (err) {
      console.error('[PaypalService] init error:', err);
      throw err;
    }
  }

  /**
   * Renders PayPal Buttons into a container with the specified amount.
   */
  async renderButtons(
    container: HTMLElement,
    amount: number,
    options?: {
      clientId?: string;
      currency?: string;
      onApprove?: (details: any) => void;
      onError?: (error: unknown) => void;
    }
  ): Promise<void> {
    const currency = options?.currency ?? 'USD';
    const paypal = await this.init(options?.clientId, currency);

    const value = amount.toFixed(2);

    const buttonsConfig: PayPalButtonsComponentOptions = {
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
      createOrder: (_data, actions) => {
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [
            { amount: { currency_code: currency, value } }
          ]
        } as any);
      },
      onApprove: async (_data, actions) => {
        try {
          const details = await actions.order?.capture();
          options?.onApprove?.(details as any);
        } catch (err) {
          console.error('[PaypalService] onApprove error:', err);
          options?.onError?.(err);
        }
      },
      onError: (err) => {
        console.error('[PaypalService] onError:', err);
        options?.onError?.(err);
      }
    };

  if (!paypal.Buttons) throw new Error('PayPal Buttons component unavailable');
  await paypal.Buttons(buttonsConfig).render(container);
  }
}
