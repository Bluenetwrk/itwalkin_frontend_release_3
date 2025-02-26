



<>
<Carousel
swipeable={true}
draggable={false}
responsive={responsive}
autoPlay={false}
autoPlaySpeed={4000}
keyBoardControl={true}
dotListClass="custom-dot-list-style"
itemClass="carousel-item-padding-40-px"
containerClass="carousel-container"
infinite={true}
removeArrowOnDeviceType={["tablet", "mobile"]}
>

<div style={{ display: "flex" }}>


  <div className={styles.MobFilterJobTitleWrapper}>
    <label><input className={styles.MobJobtitleFilter} type="radio" name="Rfilter" onClick={() => { getjobs() }} />All</label>
    {
      jobTags.map((tags, i) => {
        return (
          <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
            className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
              tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
              styles.TagHeading : styles.MobJobtitleFilter}
            type="radio" name="Rfilter"
            onClick={() => { filterByJobTitle(tags.value) }}
          />{tags.value}</label>

        )
      }).slice(0, 4)
    }

  </div>

  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(4, 9)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(9, 14)
    }
  </div>
</div>

{/* ....up to here is 1st div i.e button in 1st display and now from down here is 2nd div..i.e 2nd display..................................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(14, 19)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(19, 24)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(24, 29)
    }
  </div>
</div>
{/* ....from down here is 3rd div..i.e 3rd display..................................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(29, 34)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(34, 39)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(39, 44)
    }
  </div>
</div>
{/* .................from down here is 4th div..i.e 4th display....................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(44, 49)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(49, 54)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(54, 59)
    }
  </div>
</div>
{/* .................from down here is 5th div..i.e 5th display....................... */}

<div style={{ display: "flex" }}>

  <div className={styles.MobFilterJobTitleWrapper}>
    {
      jobTags.map((tags, i) => {
        return (
          <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
            className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
              tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
              styles.TagHeading : styles.MobJobtitleFilter}
            type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

        )
      }).slice(59, 64)
    }
  </div>

  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(64, 69)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(69, 74)
    }
  </div>
</div>

{/* ....ufrom down here is 6th div..i.e 6th display..................................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(74, 79)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(79, 84)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(84, 89)
    }
  </div>
</div>
{/* ....from down here is 7th div..i.e 7th display..................................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(89, 94)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(94, 99)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(99, 104)
    }
  </div>
</div>
{/* .................from down here is 8th div..i.e 8th display....................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(104, 109)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(109, 114)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(114, 119)
    }
  </div>
</div>
{/* .................from down here is 9th div..i.e 9th display....................... */}

<div style={{ display: "flex" }}>

  <div className={styles.MobFilterJobTitleWrapper}>
    {
      jobTags.map((tags, i) => {
        return (
          <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
            className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
              tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
              styles.TagHeading : styles.MobJobtitleFilter}
            type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
        )
      }).slice(119, 124)
    }
  </div>

  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(124, 129)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(129, 134)
    }
  </div>
</div>

{/* ....from down here is 10th div..i.e 10th display..................................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(134, 139)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(139, 144)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(144, 149)
    }
  </div>
</div>
{/* ....from down here is 11th div..i.e 11th display..................................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(149, 154)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(154, 159)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
          tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "ROLE" || tags.value === "COMPANY TYPE"}
          className={tags.value === "TECHNOLOGIES" || tags.value === "EDUCATION" || tags.value === "COLLEGE TYPE" || tags.value === "NOTICE PERIOD" || tags.value === "SALARY" ||
            tags.value === "EXPERIENCE" || tags.value === "Job Type" || tags.value === "INDUSTRY" || tags.value === "TOOLS/PROTOCOLS" || tags.value === "COMPANY TYPE" || tags.value === "ROLE" ?
            styles.TagHeading : styles.MobJobtitleFilter}
          type="radio" name="Rfilter" onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>

      )
    }).slice(159, 164)
    }
  </div>
</div>


</Carousel>

//   All Jobs

<Carousel
swipeable={true}
draggable={false}
responsive={responsive}
autoPlay={false}
autoPlaySpeed={4000}
keyBoardControl={true}
dotListClass="custom-dot-list-style"
itemClass="carousel-item-padding-40-px"
containerClass="carousel-container"
infinite={true}
removeArrowOnDeviceType={["tablet", "mobile"]}
>

<div style={{ display: "flex" }}>
 

  <div className={styles.MobFilterJobTitleWrapper}>
    <label><input className={styles.MobJobtitleFilter} type="radio" name="Rfilter" onClick={() => { getjobs() }} />All</label>
    {
      jobTags.map((tags, i) => {
        return (
          <label><input  disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
            tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
            className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
            tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
            styles.TagHeading: styles.MobJobtitleFilter}
          checked={tags.value==="Javascript"}
         
            type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
       
          )
      }).slice(0, 4)
    }
  </div>

  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(4, 9)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(9, 14)
    }
  </div>
</div>

{/* ....up to here is 1st div i.e button in 1st display and now from down here is 2nd div..i.e 2nd display..................................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(14, 19)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(19, 24)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(24, 29)
    }
  </div>
</div>
{/* ....from down here is 3rd div..i.e 3rd display..................................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(29, 34)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(34, 39)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(39, 44)
    }
  </div>
</div>
{/* .................from down here is 4th div..i.e 4th display....................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(44, 49)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(49,54)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(54, 59)
    }
  </div>
</div>
{/* .................from down here is 5th div..i.e 5th display....................... */}

<div style={{ display: "flex" }}>              

  <div className={styles.MobFilterJobTitleWrapper}>
    {
      jobTags.map((tags, i) => {
        return (
          <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
            tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
            className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
            tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
            styles.TagHeading: styles.MobJobtitleFilter}
            type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
       
          )
      }).slice(59, 64)
    }
  </div>

  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(64, 69)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(69, 74)
    }
  </div>
</div>

{/* ....ufrom down here is 6th div..i.e 6th display..................................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(74, 79)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(79, 84)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(84, 89)
    }
  </div>
</div>
{/* ....from down here is 7th div..i.e 7th display..................................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(89, 94)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(94, 99)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(99, 104)
    }
  </div>
</div>
{/* .................from down here is 8th div..i.e 8th display....................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(104, 109)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(109,114)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(114, 119)
    }
  </div>
</div>
{/* .................from down here is 9th div..i.e 9th display....................... */}

<div style={{ display: "flex" }}>
 
  <div className={styles.MobFilterJobTitleWrapper}>
    {
      jobTags.map((tags, i) => {
        return (
          <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
            tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
            className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
            tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
            styles.TagHeading: styles.MobJobtitleFilter}
            type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
                             )
      }).slice(119, 124)
    }
  </div>

  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(124, 129)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(129, 134)
    }
  </div>
</div>

{/* ....from down here is 10th div..i.e 10th display..................................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(134, 139)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(139, 144)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(144, 149)
    }
  </div>
</div>
{/* ....from down here is 11th div..i.e 11th display..................................... */}
<div style={{ display: "flex" }}>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(149, 154)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(154, 159)
    }
  </div>
  <div className={styles.MobFilterJobTitleWrapper}>
    {jobTags.map((tags, i) => {
      return (
        <label><input disabled={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="ROLE" || tags.value==="COMPANY TYPE" }
          className={tags.value==="TECHNOLOGIES" || tags.value==="EDUCATION" || tags.value==="COLLEGE TYPE" || tags.value==="NOTICE PERIOD" || tags.value==="SALARY" ||
          tags.value==="EXPERIENCE" || tags.value==="Job Type" || tags.value==="INDUSTRY" || tags.value==="TOOLS/PROTOCOLS" || tags.value==="COMPANY TYPE" || tags.value==="ROLE"?
          styles.TagHeading: styles.MobJobtitleFilter}
          type= "radio" name="Rfilter"  onClick={() => { filterByJobTitle(tags.value) }} />{tags.value}</label>
     
      )
    }).slice(159, 164)
    }
  </div>
</div>


</Carousel>
</>