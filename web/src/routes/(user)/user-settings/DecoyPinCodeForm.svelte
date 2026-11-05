<script lang="ts">
  import { handleError } from '#lib/utils/handle-error.ts';
  import { resetDecoyPinCode, setupDecoyPinCode } from '@immich/sdk';
  import { Button, Field, Heading, PinInput, Text, toastManager } from '@immich/ui';
  import { t } from 'svelte-i18n';

  let pinCode = $state('');
  let decoyPinCode = $state('');
  let confirmDecoyPinCode = $state('');
  let isLoading = $state(false);
  let canRemove = $derived(pinCode.length === 6);
  let canSubmit = $derived(canRemove && decoyPinCode.length === 6 && decoyPinCode === confirmDecoyPinCode);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    isLoading = true;
    try {
      await setupDecoyPinCode({ decoyPinCodeSetupDto: { pinCode, decoyPinCode } });
      resetForm();
      toastManager.primary($t('decoy_pin_code_saved'));
    } catch (error) {
      handleError(error, $t('unable_to_save_decoy_pin_code'));
    } finally {
      isLoading = false;
    }
  };

  const handleRemove = async () => {
    isLoading = true;
    try {
      await resetDecoyPinCode({ decoyPinCodeResetDto: { pinCode } });
      resetForm();
      toastManager.primary($t('decoy_pin_code_removed'));
    } catch (error) {
      handleError(error, $t('unable_to_remove_decoy_pin_code'));
    } finally {
      isLoading = false;
    }
  };

  const resetForm = () => {
    pinCode = '';
    decoyPinCode = '';
    confirmDecoyPinCode = '';
  };
</script>

<form autocomplete="off" onsubmit={handleSubmit}>
  <div class="flex flex-col place-content-center place-items-center gap-6">
    <Heading>{$t('decoy_pin_code')}</Heading>
    <Text color="muted" size="small" class="max-w-md text-center">{$t('decoy_pin_code_description')}</Text>
    <Field label={$t('current_pin_code')}>
      <PinInput bind:value={pinCode} />
    </Field>
    <Field label={$t('new_decoy_pin_code')}>
      <PinInput bind:value={decoyPinCode} />
    </Field>
    <Field label={$t('confirm_new_decoy_pin_code')}>
      <PinInput bind:value={confirmDecoyPinCode} />
    </Field>
  </div>

  <div class="mt-4 flex justify-end gap-2">
    <Button
      shape="round"
      color="danger"
      type="button"
      size="small"
      disabled={!canRemove || isLoading}
      onclick={handleRemove}
    >
      {$t('remove_decoy_pin_code')}
    </Button>
    <Button shape="round" color="secondary" type="button" size="small" onclick={resetForm}>
      {$t('clear')}
    </Button>
    <Button shape="round" type="submit" size="small" loading={isLoading} disabled={!canSubmit}>
      {$t('save')}
    </Button>
  </div>
</form>
