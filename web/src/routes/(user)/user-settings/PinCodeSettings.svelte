<script lang="ts">
  import OnEvents from '#lib/components/OnEvents.svelte';
  import DecoyPinCodeForm from './DecoyPinCodeForm.svelte';
  import PinCodeChangeForm from './PinCodeChangeForm.svelte';
  import PinCodeCreateForm from '#lib/components/user-settings-page/PinCodeCreateForm.svelte';
  import { getAuthStatus } from '@immich/sdk';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let hasPinCode = $state(false);

  onMount(async () => {
    const { pinCode } = await getAuthStatus();
    hasPinCode = pinCode;
  });

  const onUserPinCodeReset = () => {
    hasPinCode = false;
  };
</script>

<OnEvents {onUserPinCodeReset} />

<section class="my-4 sm:ms-8">
  {#if hasPinCode}
    <div in:fade={{ duration: 200 }}>
      <PinCodeChangeForm />
    </div>
    <div class="mt-12" in:fade={{ duration: 200 }}>
      <DecoyPinCodeForm />
    </div>
  {:else}
    <div in:fade={{ duration: 200 }}>
      <PinCodeCreateForm onCreated={() => (hasPinCode = true)} />
    </div>
  {/if}
</section>
