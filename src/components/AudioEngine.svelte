<script>
	let { started = false, currentSection = 0 } = $props();

	let bgMusic = $state(null);
	let voiceAudio = $state(null);

	const voiceFiles = [
		'/audio/voice-01.mp3',
		'/audio/voice-02.mp3',
		'/audio/voice-03.mp3',
		'/audio/voice-04.mp3',
		'/audio/voice-05.mp3',
		'/audio/voice-06.mp3'
	];

	$effect(() => {
		if (started && bgMusic) {
			bgMusic.volume = 0.55;
			bgMusic.play().catch(() => {});
		}
	});

	$effect(() => {
		if (!started || !voiceAudio || !bgMusic) return;

		// stop any current voice
		voiceAudio.pause();
		voiceAudio.currentTime = 0;

		const src = voiceFiles[currentSection];
		if (!src) return;

		voiceAudio.src = src;
		voiceAudio.volume = 1;

		// duck background music
		bgMusic.volume = 0.15;

		voiceAudio.play().catch(() => {});

		voiceAudio.onended = () => {
			bgMusic.volume = 0.55;
		};
	});
</script>

<!-- these elements are invisible but active -->
<audio bind:this={bgMusic} src="/audio/background.mp3" loop preload="auto"></audio>
<audio bind:this={voiceAudio} preload="none"></audio>
