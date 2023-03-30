/**
 * This plugin embeds a YouTube video instead of linking to it
 *
 * Usage:
 *
 * {% ptc-youtube src="https://www.youtube.com/watch?v=oHg5SJYRHA0" %}
 */

const youtubeBlockRegex = new RegExp("{% curriculum-youtube([^(%})])*%}", "gm");
const youtubeLinkRegex = new RegExp('.*src="[^=]*=([^"]*)".*');

window.DocsifyCURRICULUMYoutubePlugin = {
  create: () => {
    return function (hook) {
      hook.beforeEach(function (content) {
        const convertedContent = content.replace(
          youtubeBlockRegex,
          (youtubeBlock) => {
            const link = youtubeBlock.match(youtubeLinkRegex)[1];

            return `[youtube link](https://www.youtube.com/embed/${link} ':include :type=iframe allow=fullscreen; width=100% height=400px')`;
          }
        );

        return convertedContent;
      });
    };
  },
};