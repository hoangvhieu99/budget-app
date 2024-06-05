export default function Input({
  id,
  type,
  placeholder,
  onChange,
  defaultValue,
}) {
  return (
    <div className="">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        // required
        defaultValue={defaultValue}
        onChange={onChange}
        className="bg-slate-100 p-3 rounded-lg w-full"
      />
    </div>
  );
}
