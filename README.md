# Khrum Kashan - AI Infrastructure Portfolio

A static professional portfolio focused on AI infrastructure leadership, accelerated compute, Linux, cloud platforms, patents, and technical writing.

## Features

- **Technical editorial design**: An infrastructure-blueprint visual system with strong typography, grid lines, and restrained color
- **Responsive**: Purpose-built desktop and mobile layouts with an accessible navigation menu
- **Theme aware**: Light and dark themes with operating-system preference detection
- **Multi-page Architecture**: Organized content across dedicated professional pages
- **Professional Sections**:
  - Home with AI infrastructure leadership positioning
  - About page covering GPU platforms, Linux, HPC networking, validation, and reliability
  - Writing page with Substack and selected technical articles
  - Patents showcase with more than 10 granted patents
  - Curated book summaries collection
  - Privacy-focused contact page

## Pages

- `index.html` - Modern AI infrastructure leadership homepage
- `about-simple.html` - AI infrastructure leadership profile
- `blogs.html` - Substack destination and selected technical articles
- `patents.html` - Registry of granted patents
- `books.html` - Curated book summaries with detailed insights
- `contact-simple.html` - Professional contact destinations

These six files are the active published pages. The other HTML files are retained legacy pages and should not be used for new content.

## Technologies Used

- HTML5 with semantic markup
- CSS3 with Grid, Flexbox, custom properties, and responsive layouts
- JavaScript (ES6+) for theme and responsive navigation behavior
- Font Awesome 6 icons
- Manrope and IBM Plex Mono typography

## Key Features

### Technical Writing
- **Substack**: Primary destination for essays and new writing
- **Selected Articles**: Published work on Linux, open source, and platform quality

### Patents Showcase
- **10+ Granted Patents**: Telecommunications, capacity planning, and machine-learning inventions
- **Technical Details**: Patent numbers, descriptions, and innovation impact
- **Professional Display**: Clean, scannable format for business networking

## Local Preview

No build or dependency installation is required. From the repository root, run:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000` and review the changed page at desktop and mobile widths. Fonts and icons require an internet connection because they load from CDNs.

## Updating the Site

1. Start from the current live branch:

   ```powershell
   $branch = "update/short-topic"
   git fetch upstream
   git switch -c $branch upstream/main
   ```

2. Edit only the relevant active page:

   | Update | File |
   | --- | --- |
   | Homepage positioning | `index.html` |
   | Biography and experience | `about-simple.html` |
   | Substack or article links | `blogs.html` |
   | Book summaries | `books.html` |
   | Patent registry | `patents.html` |
   | Professional links | `contact-simple.html` |
   | Design and responsive layout | `css/style-new.css` |
   | Theme and mobile navigation | `js/script-new.js` |

3. If `css/style-new.css` or `js/script-new.js` changes, update its `?v=YYYYMMDD` value in all six active HTML pages. This changes the asset URL and prevents browsers from displaying an older cached design.

4. Preview locally, then check the patch:

   ```powershell
   git diff --check
   git status --short
   ```

5. Commit, push the branch to `kkkashan/khrumkashan`, and open a pull request against `kashan115/khrumkashan:main`. Keep the pull request minimal with no body or comments:

   ```powershell
   git add books.html
   git commit -m "Concise change"
   git push -u origin $branch
   gh pr create --repo kashan115/khrumkashan --base main --head "kkkashan:$branch" --title "Concise title" --body ""
   ```

## Professional Impact

This portfolio is designed for:
- **Executive Networking**: C-level professional interactions
- **Speaking Opportunities**: Conference and event organizers  
- **Business Development**: Partnership discussions
- **Career Advancement**: Showcasing expertise and innovation

## Deployment

GitHub Pages publishes the repository root from the `main` branch. The `CNAME` file must remain in the root to preserve `khrumkashan.com`. Merging a pull request to `main` triggers the branch-based Pages deployment; no application build step is required.

After merging, verify the changed page at `https://khrumkashan.com`. If an old design appears, first confirm that the page references the current versioned CSS URL, then use a hard refresh (`Ctrl+Shift+R`) to clear an existing local browser cache.

## Visual Design

- **Technical editorial**: Structured rules, numbered sections, and infrastructure-system diagrams
- **Deliberate palette**: Warm neutral surfaces with cobalt and signal-orange accents
- **Flat composition**: Sharp boundaries and asymmetric layouts instead of floating cards
- **Responsive typography**: Fluid sizing and purpose-built mobile composition

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.

## Contact

- Substack: [substack.com/@kkashan](https://substack.com/@kkashan)
- LinkedIn: [linkedin.com/in/kkashan](https://www.linkedin.com/in/kkashan/)
- GitHub: [github.com/kashan115](https://github.com/kashan115)
