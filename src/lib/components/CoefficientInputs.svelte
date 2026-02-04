<script lang="ts">
	interface Props {
		a: number;
		b: number;
		c: number;
		onchange: (coefficients: { a: number; b: number; c: number }) => void;
	}

	let { a = $bindable(1), b = $bindable(0), c = $bindable(0), onchange }: Props = $props();

	function handleChange() {
		onchange({ a, b, c });
	}

	function increment(field: 'a' | 'b' | 'c', step = 0.1) {
		if (field === 'a') a = Math.round((a + step) * 10) / 10;
		else if (field === 'b') b = Math.round((b + step) * 10) / 10;
		else c = Math.round((c + step) * 10) / 10;
		handleChange();
	}

	function decrement(field: 'a' | 'b' | 'c', step = 0.1) {
		if (field === 'a') a = Math.round((a - step) * 10) / 10;
		else if (field === 'b') b = Math.round((b - step) * 10) / 10;
		else c = Math.round((c - step) * 10) / 10;
		handleChange();
	}

	function handleKeydown(event: KeyboardEvent, field: 'a' | 'b' | 'c') {
		const step = event.shiftKey ? 1 : 0.1;
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			increment(field, step);
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			decrement(field, step);
		}
	}
</script>

<fieldset class="coefficient-inputs">
	<legend>Coefficients</legend>

	<label>
		<span>a (leading coefficient)</span>
		<div class="input-group">
			<button type="button" class="step-btn" onclick={() => decrement('a')} aria-label="Decrease a">
				−
			</button>
			<input
				type="number"
				bind:value={a}
				step="0.1"
				oninput={handleChange}
				onkeydown={(e) => handleKeydown(e, 'a')}
				aria-describedby="a-hint"
			/>
			<button type="button" class="step-btn" onclick={() => increment('a')} aria-label="Increase a">
				+
			</button>
		</div>
		<small id="a-hint">Controls parabola width and direction. Use arrow keys to adjust.</small>
	</label>

	<label>
		<span>b (linear coefficient)</span>
		<div class="input-group">
			<button type="button" class="step-btn" onclick={() => decrement('b')} aria-label="Decrease b">
				−
			</button>
			<input
				type="number"
				bind:value={b}
				step="0.1"
				oninput={handleChange}
				onkeydown={(e) => handleKeydown(e, 'b')}
				aria-describedby="b-hint"
			/>
			<button type="button" class="step-btn" onclick={() => increment('b')} aria-label="Increase b">
				+
			</button>
		</div>
		<small id="b-hint">Shifts the axis of symmetry. Use arrow keys to adjust.</small>
	</label>

	<label>
		<span>c (constant)</span>
		<div class="input-group">
			<button type="button" class="step-btn" onclick={() => decrement('c')} aria-label="Decrease c">
				−
			</button>
			<input
				type="number"
				bind:value={c}
				step="0.1"
				oninput={handleChange}
				onkeydown={(e) => handleKeydown(e, 'c')}
				aria-describedby="c-hint"
			/>
			<button type="button" class="step-btn" onclick={() => increment('c')} aria-label="Increase c">
				+
			</button>
		</div>
		<small id="c-hint">The y-intercept. Use arrow keys to adjust.</small>
	</label>
</fieldset>

<style>
	.coefficient-inputs {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		/* Fix fieldset expanding beyond parent */
		width: 100%;
		min-width: 0;
		box-sizing: border-box;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		/* Prevent label from expanding */
		min-width: 0;
	}

	.input-group {
		display: flex;
		align-items: stretch;
		max-width: 100%;
		/* Prevent overflow */
		min-width: 0;
	}

	.step-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		min-width: 44px;
		flex-shrink: 0;
		min-height: 44px;
		font-size: 1.5rem;
		font-weight: bold;
		border: 2px solid #ccc;
		background: #f8f9fa;
		cursor: pointer;
		transition:
			background-color 0.2s,
			border-color 0.2s;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	.step-btn:first-child {
		border-radius: 4px 0 0 4px;
		border-right: none;
	}

	.step-btn:last-child {
		border-radius: 0 4px 4px 0;
		border-left: none;
	}

	.step-btn:hover {
		background: #e9ecef;
	}

	.step-btn:active {
		background: #dee2e6;
	}

	.step-btn:focus-visible {
		outline: 2px solid #2563eb;
		outline-offset: -2px;
		z-index: 1;
	}

	input[type='number'] {
		flex: 1;
		font-size: 1.25rem;
		padding: 0.5rem;
		min-width: 0;
		border: 2px solid #ccc;
		border-radius: 0;
		text-align: center;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
		/* Hide native spinners */
		-moz-appearance: textfield;
	}

	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number']:focus {
		outline: none;
		border-color: #2563eb;
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
		z-index: 1;
	}

	small {
		color: #666;
	}
</style>
