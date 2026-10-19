import React from "react";
import {
  createCourse,
  deleteCourse,
  updateCourse,
} from "@/features/courses/services/courseService";
import CourseForm from "../CourseForm";
import DataTable from "../DataTable";
import Pagination from "../Pagination";
import ResourceHeader from "../ResourceHeader";
import RowActionsCell from "../RowActionsCell";
import { useResourceManager } from "../../hooks/useResourceManager";
import { emptyCourse } from "../../utils/emptyForms";
import { paginate } from "../../utils/pagination";

const columns = [
  "Name",
  "Type",
  "Destination",
  "Duration",
  "University",
  "Actions",
];

const courseService = {
  create: createCourse,
  update: updateCourse,
  remove: deleteCourse,
};

const CoursesTab = ({
  courses,
  universities,
  onRefresh,
  onError,
  onSuccess,
  onUnauthorized,
}) => {
  const {
    form,
    setForm,
    isEditing,
    isFormOpen,
    page,
    setPage,
    openCreateForm,
    closeForm,
    startEdit,
    save,
    remove,
  } = useResourceManager({
    label: "Course",
    emptyForm: emptyCourse,
    service: courseService,
    onError,
    onSuccess,
    onRefresh,
    onUnauthorized,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...form };
    /** An unset university must be absent, not an empty string. */
    if (!payload.university) delete payload.university;
    await save(payload);
  };

  if (isFormOpen) {
    return (
      <CourseForm
        form={form}
        setForm={setForm}
        universities={universities}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onCancel={closeForm}
      />
    );
  }

  return (
    <section className="space-y-6">
      <ResourceHeader
        title="Courses"
        subtitle={`${courses.length} courses listed`}
        createLabel="Create Course"
        onCreate={openCreateForm}
      />

      <DataTable
        columns={columns}
        isEmpty={courses.length === 0}
        emptyMessage="No courses found."
      >
        {paginate(courses, page).map((course) => (
          <tr key={course._id} className="border-t border-gray-200">
            <td className="p-3">{course.name}</td>
            <td className="p-3">{course.type}</td>
            <td className="p-3">{course.destination}</td>
            <td className="p-3">{course.duration}</td>
            <td className="p-3">{course.university?.name || "N/A"}</td>
            <RowActionsCell
              onEdit={() =>
                startEdit(course._id, {
                  ...emptyCourse,
                  ...course,
                  university: course.university?._id || "",
                })
              }
              onDelete={() => remove(course._id)}
            />
          </tr>
        ))}
      </DataTable>

      <Pagination total={courses.length} page={page} setPage={setPage} />
    </section>
  );
};

export default CoursesTab;
