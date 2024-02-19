// tailwind.config.js
module.exports = {
  content: ['./views/**/*.{html,js,handlebars}'],
  theme: {
    extend: {
      colors: {
        'calm-blue': '#1da1f2',
        'calm-dark': '#333',
        'calm-light': '#f0f2f5',
        'comment-background': '#ffffff',
        'comment-border': '#dddddd',
        'comment-text': '#666666',
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'comment': '0 2px 4px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};
