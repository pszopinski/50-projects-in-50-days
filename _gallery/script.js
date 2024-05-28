const projects = [
  "food_chain",
  "button_ripple_effect",
  "animated_navigation",
  "background_slider",
  "blurry_loading",
  "dad_jokes",
  "drink_blood",
  "event_keycodes",
  "expanding_cards",
  "faq_collapse",
  "form_input_wave",
  "hidden_search_widget",
  "incrementing_counter",
  "movie_app",
  "progress_steps",
  "random_choice_picker",
  "rotating_navigation",
  "scroll_animations",
  "sound_board",
  "split_landing_page",
  "theme_clock",
];

for (const project of projects) {
  const a = document.createElement("a");
  a.href = project;
  a.title = project;

  const video = document.createElement("video");
  video.src = `_gallery/videos/${project}.mp4`;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;

  a.appendChild(video);
  document.body.appendChild(a);
}
