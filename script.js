(() => {
  const roleElement = document.querySelector("#str");

  if (!roleElement) {
    return;
  }

  const roles = ["Developer", "Pega CSSA", "Roller Skater", "Swimmer"];
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    roleElement.textContent = roles[0];
    return;
  }

  const timing = {
    type: 75,
    delete: 35,
    hold: 1600,
    between: 300,
  };

  let roleIndex = 0;
  let characterIndex = roles[0].length;
  let deleting = false;

  const updateRole = () => {
    const role = roles[roleIndex];

    if (deleting) {
      characterIndex -= 1;
      roleElement.textContent = role.slice(0, characterIndex);

      if (characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        window.setTimeout(updateRole, timing.between);
        return;
      }

      window.setTimeout(updateRole, timing.delete);
      return;
    }

    characterIndex += 1;
    roleElement.textContent = role.slice(0, characterIndex);

    if (characterIndex === role.length) {
      deleting = true;
      window.setTimeout(updateRole, timing.hold);
      return;
    }

    window.setTimeout(updateRole, timing.type);
  };

  window.setTimeout(updateRole, timing.hold);
})();
